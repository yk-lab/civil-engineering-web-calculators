<template>
  <NuxtLayout class="!mt-0 space-y-10">
    <TopPageHeader />

    <div class="container mx-auto max-w-4xl space-y-8 px-4 pb-8">
      <CalcCard>
        <template #header>
          <h2 class="text-base font-semibold leading-6 text-gray-900">
            N割水深
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            指定した割合の水深（例えば8割水深等）を計算します。
          </p>
        </template>
        <NDepth />
      </CalcCard>

      <CalcCard>
        <template #header>
          <h2 class="text-base font-semibold leading-6 text-gray-900">
            マニングの公式
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            マニングの公式を用いて、流速と流量を計算します。
            円形断面の場合は、「<a
              href="#ManningFormulaForCircularCalcCard"
              class="text-blue-600 underline decoration-blue-600 hover:text-blue-400 hover:decoration-blue-400"
              >マニングの公式（円形断面）</a
            >」を使用すると計算が簡単です。
          </p>
        </template>
        <ManningFormula />
      </CalcCard>

      <CalcCard id="ManningFormulaForCircularCalcCard">
        <template #header>
          <h2 class="text-base font-semibold leading-6 text-gray-900">
            マニングの公式（円形断面）
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            マニングの公式を用いて、流速と流量を計算します。
          </p>
        </template>
        <ManningFormulaForCircular />
      </CalcCard>
    </div>
  </NuxtLayout>
</template>
