import { defineVitestConfig } from 'nuxt-vitest/config';

export default defineVitestConfig({
  test: {
    globals: true,
    // globalSetup: 'tests/setup.ts',
    dir: 'tests',
    environment: 'happy-dom',
    coverage: {
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      include: [
        'components/**/*.{vue}',
        'composables/**/*.{js,ts}',
        'pages/**/*.{vue}',
        'utils/**/*.{js,ts}',
      ],
      exclude: [],
      all: true,
    },
  },
});
