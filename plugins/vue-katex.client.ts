// @ts-ignore
import VueKatex from '@hsorby/vue3-katex';

import 'katex/dist/katex.min.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueKatex);
});
