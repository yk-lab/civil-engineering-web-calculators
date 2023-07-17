<template>
  <Combobox
    v-bind="$attrs"
    :model-value="modelValue"
    class="bg-white"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
      >
        <ComboboxInput
          :display-value="
            (coefficient) =>
              (coefficient as ManningRoughnessCoefficient).value
                ? `${(coefficient as ManningRoughnessCoefficient).name} (${
                    (coefficient as ManningRoughnessCoefficient).value
                  })`
                : (coefficient as ManningRoughnessCoefficient).name
          "
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="
              filteredManningRoughnessCoefficients.length === 0 && query !== ''
            "
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            該当する結果が見つかりませんでした。
          </div>

          <ComboboxOption
            v-for="coefficient in filteredManningRoughnessCoefficients"
            :key="`${coefficient.name}-${coefficient.value}`"
            v-slot="{ isSelected, active }"
            as="template"
            :value="coefficient"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{
                  'font-medium': isSelected,
                  'font-normal': !isSelected,
                }"
              >
                {{ coefficient.name }}
                <template v-if="coefficient.value"
                  >({{ coefficient.value }})</template
                >
              </span>
              <span
                v-if="isSelected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

import type { ManningRoughnessCoefficient } from 'utils/manning_formula';

interface Props {
  modelValue: ManningRoughnessCoefficient;
}

withDefaults(defineProps<Props>(), {
  modelValue: () => manningRoughnessCoefficients[0],
});

interface Emits {
  (e: 'update:modelValue', value: ManningRoughnessCoefficient): void;
}
defineEmits<Emits>();

const query = ref('');

const filteredManningRoughnessCoefficients = computed(() =>
  query.value === ''
    ? manningRoughnessCoefficients
    : manningRoughnessCoefficients.filter((coefficient) =>
        (coefficient.value
          ? `${coefficient.name} (${coefficient.value})`
          : coefficient.name
        )
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.value.toLowerCase().replace(/\s+/g, '')),
      ),
);
</script>
