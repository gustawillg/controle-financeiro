<script lang="ts">
</script>

<template>
  <div class="bg-white">
    <Navbar />
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 lg:py-56 sm:py-48">
        <div class="text-center">
          <h1 class="text-4xl text-gray-900 font-bold tracking-tight sm:text-6xl">
            Bem-vindo ao controle financeiro     <PlusCircleIconIcon class="h-6 w-6 text-red-500" />
          </h1>
          <p class="mt-6 text-lg text-gray-600 leading-8">
            Aqui você pode monitorar suas transações e manter controle sobre suas finanças.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/login" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
              Iniciar sessão
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
