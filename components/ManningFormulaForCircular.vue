<template>
  <CalcInputOutput>
    <template #input>
      <div>
        <label
          for="d"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          管径
          <ClientOnly
            ><KatexElement :display-mode="false" expression="d"
          /></ClientOnly>
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            id="d"
            v-model.number="values.d.value"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 200"
          />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <LengthUnitSelector v-model="values.d.unit" />
          </div>
        </div>
      </div>

      <div>
        <label
          for="h"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          水深
          <ClientOnly
            ><KatexElement :display-mode="false" expression="h"
          /></ClientOnly>
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            id="h"
            v-model.number="values.h.value"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 180"
          />
          <div class="absolute inset-y-0 right-0 flex items-center">
            <LengthUnitSelector v-model="values.h.unit" />
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
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 0.3"
          />
        </div>
      </div>
    </template>

    <template #output>
      <div>
        <label
          for="rad"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          中心角
          <ClientOnly
            ><KatexElement :display-mode="false" expression="\psi"
          /></ClientOnly>
          [rad]
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="rad"
              :value="displayScalar(rad)"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(rad).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

      <div>
        <label
          for="circularWaterWidth"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          水面幅
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="B = d \sin(\frac{\psi}{2})"
          /></ClientOnly>
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="circularWaterWidth"
              :value="displayScalar(circularWaterWidth)"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(circularWaterWidth) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(circularWaterWidth).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

      <div>
        <label
          for="circularWettedPerimeter"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          潤辺
          <ClientOnly
            ><KatexElement :display-mode="false" expression="S = d \psi / 2"
          /></ClientOnly>
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="circularWettedPerimeter"
              :value="displayScalar(circularWettedPerimeter)"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(circularWettedPerimeter) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(circularWettedPerimeter).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

      <div>
        <label
          for="circularFlowArea"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          流水断面積（流積）
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="A = \frac{d^2}{8} (\psi - \sin(\psi))"
          /></ClientOnly>
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="circularFlowArea"
              :value="displayScalar(circularFlowArea)"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(circularFlowArea) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(circularFlowArea).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

      <div>
        <label
          for="circularDepth"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          径深
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="R = \frac{A}{S} = d (1 - \sin(\psi) / \psi) / 4"
          /></ClientOnly>
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="circularDepth"
              :value="displayScalar(circularDepth)"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <span class="text-gray-500 sm:text-sm">
                {{ displayUnit(circularDepth) }}
              </span>
            </div>
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(displayScalar(circularDepth).toString())"
          >
            <ClipboardIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            <span class="sr-only">コピー</span>
          </button>
        </div>
      </div>

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
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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

import type { LengthUnitsBasedMeter } from 'utils/length_utils';
import type { ManningRoughnessCoefficient } from 'utils/manning_formula';

const clipboard = useClipboard();
const notifications = useNotifications();

const values = ref<{
  h: {
    value: number | '';
    unit: LengthUnitsBasedMeter;
  };
  d: {
    value: number | '';
    unit: LengthUnitsBasedMeter;
  };
  n: ManningRoughnessCoefficient;
  nDirect: number | '';
  i: number | '';
}>({
  h: {
    value: '',
    unit: 'mm',
  },
  d: {
    value: '',
    unit: 'mm',
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

const rad = computed(() => {
  if (values.value.h.value === '' || values.value.d.value === '') {
    return '';
  }
  const h = new Qty(values.value.h.value, values.value.h.unit);
  const d = new Qty(values.value.d.value, values.value.d.unit).to(h);
  return calcCentralAngle(h.scalar, d.scalar);
});

/**
 * 円形断面の水面幅
 */
const circularWaterWidth = computed(() => {
  if (values.value.d.value === '' || rad.value === '') {
    return '';
  }
  return new Qty(
    calcCircularWaterWidth(values.value.d.value, rad.value),
    values.value.d.unit,
  );
});

/**
 * 円形断面の潤辺
 */
const circularWettedPerimeter = computed(() => {
  if (values.value.d.value === '' || rad.value === '') {
    return '';
  }
  return new Qty(
    calcCircularWettedPerimeter(values.value.d.value, rad.value),
    values.value.d.unit,
  );
});

/**
 * 円形断面の流水断面積 (流積)
 */
const circularFlowArea = computed(() => {
  if (values.value.d.value === '' || rad.value === '') {
    return '';
  }

  const d = new Qty(values.value.d.value, values.value.d.unit);
  return new Qty(calcCircularFlowArea(d.baseScalar, rad.value), 'm^2');
});

/**
 * 円形断面の径深
 */
const circularDepth = computed(() => {
  if (values.value.d.value === '' || rad.value === '') {
    return '';
  }
  return new Qty(
    calcCircularDepth(values.value.d.value, rad.value),
    values.value.d.unit,
  );
});

const manningAverageVelocity = computed(() => {
  if (n.value === '' || circularDepth.value === '' || values.value.i === '') {
    return '';
  }
  return new Qty(
    calcManningAverageVelocity(
      n.value,
      circularDepth.value.toBase().scalar,
      values.value.i / 100,
    ),
    'm/s',
  );
});

const manningFlowVolume = computed(() => {
  if (
    n.value === '' ||
    circularDepth.value === '' ||
    values.value.i === '' ||
    circularFlowArea.value === ''
  ) {
    return '';
  }
  return new Qty(
    calcManningFlowVolume(
      n.value,
      circularDepth.value.toBase().scalar,
      values.value.i / 100,
      circularFlowArea.value.toBase().scalar,
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
