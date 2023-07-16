<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <SiteNotification
        v-for="notification of notifications"
        :key="notification.id"
        v-bind="notification"
        :class="notification.click && 'cursor-pointer'"
        @click="notification.click && notification.click(notification)"
        @close="remove(notification.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { notifications, remove } = useNotifications();
</script>
