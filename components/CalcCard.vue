<template>
  <div
    class="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
  >
    <div class="px-4 py-5 sm:px-6">
      <slot name="header" />
    </div>
    <div class="px-4 py-5 sm:p-6">
      <slot />
    </div>
  </div>
</template>
