<template>
  <CalcInputOutput>
    <template #input>
      <div>
        <label
          :for="`${baseId}-r`"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          径深
          <ClientOnly
            ><KatexElement :display-mode="false" expression="R"
          /></ClientOnly>
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            :id="`${baseId}-r`"
            v-model.number="values.r.value"
            type="number"
            name="r"
            class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 0.0854"
          />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <LengthUnitSelector v-model="values.r.unit" />
          </div>
        </div>
      </div>

      <div>
        <label
          :for="`${baseId}-h`"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          流水断面積（流積）
          <ClientOnly
            ><KatexElement :display-mode="false" expression="A"
          /></ClientOnly>
          [m<sup>2</sup>]
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              :id="`${baseId}-h`"
              v-model.number="values.a.value"
              type="number"
              name="a"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              placeholder="例) 0.0521"
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">m<sup>2</sup></span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label
          for="n"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          マニングの粗度係数
          <ClientOnly>
            <KatexElement :display-mode="false" expression="n" /> [<KatexElement
              :display-mode="false"
              expression="\text{m}^{-1/3} \text{s}"
            />]
          </ClientOnly>
        </label>
        <div class="mt-2">
          <ManningRoughnessCoefficientSelector id="n" v-model="values.n" />
        </div>
        <div v-if="enableNDirectInput" class="mt-2">
          <input
            v-model.number="values.nDirect"
            type="number"
            name="n"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 0.013"
          />
        </div>
      </div>

      <div>
        <label
          for="i"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          水路勾配
          <ClientOnly
            ><KatexElement :display-mode="false" expression="i"
          /></ClientOnly>
          [%]
        </label>
        <div class="mt-2">
          <input
            id="i"
            v-model.number="values.i"
            type="number"
            name="i"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 0.3"
          />
        </div>
      </div>
    </template>

    <template #output>
      <div>
        <label
          for="manningAverageVelocity"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          マニングの平均流速
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="v = \frac{1}{n} R^{2/3} i^{1/2}"
          /></ClientOnly>
          [m/s]
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="manningAverageVelocity"
              :value="displayScalar(manningAverageVelocity)"
              type="number"
              class="block w-full select-all rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(manningAverageVelocity) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(manningAverageVelocity).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

      <div>
        <label
          for="manningFlowVolume"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          マニングの平均流速から求めた流量
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="Q = v A = \frac{A}{n} R^{2/3} i^{1/2}"
          /></ClientOnly>
          [m<sup>3</sup>/s]
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="manningFlowVolume"
              :value="displayScalar(manningFlowVolume)"
              type="number"
              class="block w-full select-all rounded-none rounded-l-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(manningFlowVolume) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(manningFlowVolume).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>
    </template>
  </CalcInputOutput>
</template>

<script setup lang="ts">
import { ClipboardIcon } from '@heroicons/vue/24/outline';
import { useClipboard } from '@vueuse/core';
import Qty from 'js-quantities';
import uuid4 from 'uuid4';

import type { LengthUnitsBasedMeter } from 'utils/length_utils';
import type { ManningRoughnessCoefficient } from 'utils/manning_formula';

interface Props {
  baseId?: string;
}
withDefaults(defineProps<Props>(), {
  baseId: () => uuid4(),
});

const clipboard = useClipboard();
const notifications = useNotifications();

const values = ref<{
  r: {
    value: number | '';
    unit: LengthUnitsBasedMeter;
  };
  a: {
    value: number | '';
  };
  n: ManningRoughnessCoefficient;
  nDirect: number | '';
  i: number | '';
}>({
  r: {
    value: '',
    unit: 'm',
  },
  a: {
    value: '',
  },
  n: manningRoughnessCoefficients[0],
  nDirect: '',
  i: '',
});

// computed
const enableNDirectInput = computed(() => values.value.n.value === '');

const n = computed(() => {
  if (values.value.n.value !== '') {
    return values.value.n.value;
  }
  if (values.value.nDirect !== '') {
    return values.value.nDirect;
  }
  return '';
});

const manningAverageVelocity = computed(() => {
  if (n.value === '' || values.value.r.value === '' || values.value.i === '') {
    return '';
  }

  const r = new Qty(values.value.r.value, values.value.r.unit);
  return new Qty(
    calcManningAverageVelocity(n.value, r.baseScalar, values.value.i / 100),
    'm/s',
  );
});

const manningFlowVolume = computed(() => {
  if (
    n.value === '' ||
    values.value.r.value === '' ||
    values.value.a.value === '' ||
    values.value.i === ''
  ) {
    return '';
  }

  const r = new Qty(values.value.r.value, values.value.r.unit);
  return new Qty(
    calcManningFlowVolume(
      n.value,
      r.baseScalar,
      values.value.i / 100,
      values.value.a.value,
    ),
    'm^3/s',
  );
});

// methods
const displayScalar = (qty: Qty | string | number) => {
  if (qty instanceof Qty) {
    return qty.scalar;
  }
  return qty;
};

const displayUnit = (qty: Qty | string | number) => {
  if (qty instanceof Qty) {
    return qty.units();
  }
  return '';
};

const copy = (str: string) => {
  if (str === '') {
    return;
  }

  clipboard.copy(str);
  notifications.add({
    type: 'success',
    title: 'コピーしました',
  });
};
</script>
