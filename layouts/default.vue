<template>
  <div>
    <ClientOnly>
      <SiteNotifications />
    </ClientOnly>

    <div v-bind="$attrs">
      <slot />
    </div>
  </div>
</template>
