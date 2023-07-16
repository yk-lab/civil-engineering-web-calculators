<template>
  <NuxtLayout class="!mt-0 space-y-10">
    <TopPageHeader />

    <div class="container mx-auto max-w-4xl px-4 pb-8">
      <CalcCard>
        <template #header>
          <h2 class="text-base font-semibold leading-6 text-gray-900">
            n割水深
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            指定した割合の水深（例えば8割水深等）を計算します。
          </p>
        </template>
        <NDepth />
      </CalcCard>
    </div>
  </NuxtLayout>
</template>
