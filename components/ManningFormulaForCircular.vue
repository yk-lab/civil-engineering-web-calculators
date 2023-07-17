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
        <div class="mt-2">
          <input
            id="d"
            v-model.number="values.d"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 200"
          />
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
        <div class="mt-2">
          <input
            id="h"
            v-model.number="values.h"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 180"
          />
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
        </label>
        <div class="mt-2">
          <input
            id="i"
            v-model.number="values.i"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 0.01"
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
              v-model.number="rad"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(rad.toString())"
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
              v-model.number="circularWaterWidth"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(circularWaterWidth.toString())"
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
              v-model.number="circularWettedPerimeter"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(circularWettedPerimeter.toString())"
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
              v-model.number="circularFlowArea"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(circularFlowArea.toString())"
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
              v-model.number="circularDepth"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(circularDepth.toString())"
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
              v-model.number="manningAverageVelocity"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(manningAverageVelocity.toString())"
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
              v-model.number="manningFlowVolume"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy(manningFlowVolume.toString())"
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

import type { ManningRoughnessCoefficient } from 'utils/manning_formula';

const clipboard = useClipboard();
const notifications = useNotifications();

const values = ref<{
  h: number | '';
  d: number | '';
  n: ManningRoughnessCoefficient;
  nDirect: number | '';
  i: number | '';
}>({
  h: '',
  d: '',
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
  if (values.value.h === '' || values.value.d === '') {
    return '';
  }
  return calcCentralAngle(values.value.h, values.value.d);
});

/**
 * 円形断面の水面幅
 */
const circularWaterWidth = computed(() => {
  if (values.value.d === '' || rad.value === '') {
    return '';
  }
  return calcCircularWaterWidth(values.value.d, rad.value);
});

/**
 * 円形断面の潤辺
 */
const circularWettedPerimeter = computed(() => {
  if (values.value.d === '' || rad.value === '') {
    return '';
  }
  return calcCircularWettedPerimeter(values.value.d, rad.value);
});

/**
 * 円形断面の流水断面積 (流積)
 */
const circularFlowArea = computed(() => {
  if (values.value.d === '' || rad.value === '') {
    return '';
  }
  return calcCircularFlowArea(values.value.d, rad.value);
});

/**
 * 円形断面の径深
 */
const circularDepth = computed(() => {
  if (values.value.d === '' || rad.value === '') {
    return '';
  }
  return calcCircularDepth(values.value.d, rad.value);
});

const manningAverageVelocity = computed(() => {
  if (n.value === '' || circularDepth.value === '' || values.value.i === '') {
    return '';
  }
  return calcManningAverageVelocity(
    n.value,
    circularDepth.value,
    values.value.i,
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
  return calcManningFlowVolume(
    n.value,
    circularDepth.value,
    values.value.i,
    circularFlowArea.value,
  );
});

// methods
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
