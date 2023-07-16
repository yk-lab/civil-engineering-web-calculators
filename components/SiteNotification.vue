<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5"
      @mouseover="onMouseover"
      @mouseout="onMouseout"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="shrink-0">
            <Component :is="iconName" class="h-6 w-6" :class="iconColorClass" />
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-gray-900">{{ title }}</p>
            <p v-if="description" class="mt-1 text-sm text-gray-500">
              {{ description }}
            </p>
          </div>
          <div class="ml-4 flex shrink-0">
            <button
              type="button"
              class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              @click.stop="close"
            >
              <span class="sr-only">Close</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <!-- TODO: progress bar -->
    </div>
  </transition>
</template>

<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/24/outline';

import type { Notification } from 'composables/useNotifications';
import type { Timer, Ticker } from 'plugins/timer.client';

type Props = Notification & {
  callback?: Function | null;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  description: null,
  icon: null,
  timeout: 5000,
  callback: null,
});

const emit = defineEmits(['close']);

const timer = ref<Timer | null>(null);
const ticker = ref<Ticker | null>(null);
const remainingTime = ref(props.timeout);
const { $timer, $ticker } = useNuxtApp();

// computed
const iconName = computed(() => {
  return (
    props.icon ||
    {
      warning: 'IconAlertWarning',
      info: 'IconAlertInfo',
      success: 'IconAlertSuccess',
      error: 'IconAlertDanger',
    }[props.type]
  );
});

const iconColorClass = computed(() => {
  return (
    {
      warning: 'text-orange-400',
      info: 'text-blue-400',
      success: 'text-green-400',
      error: 'text-red-400',
    }[props.type] || 'text-gray-400'
  );
});

// const progressBarColorClass = computed(() => {
//   return (
//     {
//       warning: 'bg-orange-400',
//       info: 'bg-blue-400',
//       success: 'bg-green-400',
//       error: 'bg-red-400',
//     }[props.type] || 'bg-gray-400'
//   );
// });

// const progressBarStyle = computed(() => {
//   const remainingPercent = (remainingTime.value / props.timeout) * 100;
//   return { width: `${remainingPercent}%` };
// });

// mounted
onMounted(() => {
  if (!$timer) {
    return;
  }
  if (props.timeout) {
    timer.value = new $timer(() => {
      close();
      ticker.value?.stop();
    }, props.timeout);
    ticker.value = new $ticker(() => {
      remainingTime.value -= 10;
    }, 10);
  }
});

// before unmount
onBeforeUnmount(() => {
  if (timer.value) {
    timer.value.stop();
    ticker.value?.stop();
  }
});

// methods
const onMouseover = () => {
  if (timer.value) {
    timer.value.pause();
    ticker.value?.stop();
  }
};

const onMouseout = () => {
  if (timer.value) {
    timer.value.resume();
    ticker.value?.start();
  }
};

const close = () => {
  if (props.callback) {
    props.callback();
  }
  emit('close');
};
</script>

<style lang="postcss" scoped>
.notification-container {
  @apply pointer-events-auto relative z-50 w-full overflow-hidden rounded-lg shadow-lg ring-1;

  animation: transition-opacity 0.5s ease-in-out;
}

@keyframes transition-opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
