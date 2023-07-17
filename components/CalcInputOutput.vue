<template>
  <div v-bind="$attrs" class="space-y-12">
    <div class="space-y-8">
      <h3 class="text-base font-semibold leading-7 text-gray-900">計算条件</h3>
      <slot name="input" />
    </div>

    <div class="space-y-8">
      <h3 class="text-base font-semibold leading-7 text-gray-900">計算結果</h3>
      <slot name="output" />
    </div>
  </div>
</template>
