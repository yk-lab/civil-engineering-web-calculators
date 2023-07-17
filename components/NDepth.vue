<template>
  <CalcInputOutput>
    <template #input>
      <div>
        <label
          for="N"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          割合
          <ClientOnly
            ><KatexElement
              :display-mode="false"
              expression="\frac{h}{d} \times 10"
          /></ClientOnly>
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            id="N"
            v-model.number="values.n"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 8"
          />
          <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <span id="n-unit" class="text-gray-500 sm:text-sm">割</span>
          </div>
        </div>
      </div>

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
    </template>

    <template #output>
      <div>
        <label
          for="result"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          {{ values.n || 'N' }}割水深
          <ClientOnly
            ><KatexElement :display-mode="false" expression="h"
          /></ClientOnly>
        </label>
        <div class="mt-2 flex rounded-md shadow-sm">
          <div class="relative flex grow items-stretch focus-within:z-10">
            <input
              id="result"
              v-model.number="result"
              type="number"
              class="block w-full rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              readonly
            />
          </div>
          <button
            type="button"
            class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            @click="copy"
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

const clipboard = useClipboard();
const notifications = useNotifications();

const values = ref<{
  n: number | '';
  d: number | '';
}>({
  n: '',
  d: '',
});

// computed
const result = computed(() => {
  if (values.value.n === '' || values.value.d === '') {
    return '';
  }

  return calcNDepth(values.value.n, values.value.d);
});

// methods
const copy = () => {
  if (result.value === '') {
    return;
  }

  clipboard.copy(result.value.toString());
  notifications.add({
    type: 'success',
    title: 'コピーしました',
  });
};
</script>
