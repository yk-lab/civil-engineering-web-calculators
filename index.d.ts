import { Timer, Ticker } from 'plugins/timer.client';

declare module '#app' {
  interface NuxtApp {
    $timer: typeof Timer;
    $ticker: typeof Ticker;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $timer: typeof Timer;
    $ticker: typeof Ticker;
  }
}
