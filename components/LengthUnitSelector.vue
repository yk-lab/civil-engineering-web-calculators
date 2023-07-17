<template>
  <div class="absolute inset-y-0 right-0 flex items-center">
    <label :for="id" class="sr-only">単位</label>
    <select
      v-bind="$attrs"
      :id="id"
      :value="modelValue"
      class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option
        v-for="unit in lengthUnitsBasedMeter"
        :key="unit"
        :value="unit"
        :selected="unit === modelValue"
      >
        {{ unit }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import uuid4 from 'uuid4';

import type { LengthUnitsBasedMeter } from 'utils/length_utils';

interface Props {
  modelValue: LengthUnitsBasedMeter;
  id?: string;
}

withDefaults(defineProps<Props>(), {
  id: () => uuid4(),
});

interface Emits {
  (e: 'update:modelValue', value: LengthUnitsBasedMeter): void;
}
defineEmits<Emits>();
</script>
