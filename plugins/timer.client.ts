const nowTimeStampInSec = () => Math.floor(Date.now() / 1000);

export class Timer {
  private timerId: number | undefined = undefined;
  private start: number = nowTimeStampInSec();
  private remaining: number;

  constructor(
    private callback: Function,
    private delay: number,
  ) {
    this.remaining = delay;
    this.resume();
  }

  pause() {
    window.clearTimeout(this.timerId);
    this.remaining -= nowTimeStampInSec() - this.start;
  }

  resume() {
    // 秒単位のタイムスタンプを取得
    this.start = new Date().getTime();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.remaining);
  }

  reset() {
    this.start = nowTimeStampInSec();
    window.clearTimeout(this.timerId);
    this.timerId = window.setTimeout(this.callback, this.delay);
  }

  stop() {
    window.clearTimeout(this.timerId);
  }
}

export class Ticker {
  private id: number | undefined = undefined;

  constructor(
    private callback: Function,
    private interval: number,
  ) {
    this.start();
  }

  start() {
    this.id = window.setInterval(this.callback, this.interval);
  }

  stop() {
    window.clearInterval(this.id);
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('timer', Timer);
  nuxtApp.provide('ticker', Ticker);
});
