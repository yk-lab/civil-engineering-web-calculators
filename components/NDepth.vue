<template>
  <div class="space-y-12">
    <div class="space-y-8">
      <h3 class="text-base font-semibold leading-7 text-gray-900">計算条件</h3>

      <div>
        <label
          for="n"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          割合 (<KatexElement expression="\frac{h}{d} \times 10" />)
        </label>
        <div class="relative mt-2 rounded-md shadow-sm">
          <input
            id="n"
            v-model.number="values.n"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 8"
            inputmode="decimal"
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
          管径 (<KatexElement expression="d" />)
        </label>
        <div class="mt-2">
          <input
            id="d"
            v-model.number="values.d"
            type="number"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            placeholder="例) 200"
            inputmode="decimal"
          />
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <h3 class="text-base font-semibold leading-7 text-gray-900">計算結果</h3>

      <div>
        <label
          for="result"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          {{ values.n || 'n' }}割水深 (<KatexElement expression="h" />)
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
    </div>
  </div>
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
