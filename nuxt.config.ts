// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@dargmuesli/nuxt-cookie-control',
    '@nuxt/devtools',
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-adsense',
    '@nuxtjs/partytown',
    '@nuxtjs/robots',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/web-vitals',
    'nuxt-cloudflare-analytics',
    'nuxt-gtag',
    'nuxt-headlessui',
    'nuxt-purgecss',
    'nuxt-vitest',
  ],
});
