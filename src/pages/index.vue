<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Orçamentos', href: '#' },
  { name: 'Relatórios', href: '#' },
  { name: 'Configurações', href: '#' },
  { name: 'Resumo', href: '#' },
  { name: 'Calendário', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>

<template>
  <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
      <nav class="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="p-1.5 -m-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
        </div>
        <div class="flex lg:hidden">
          <button type="button" class="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 -m-2.5" @click="mobileMenuOpen = true">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-x-12">
          <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-sm text-gray-900 font-semibold leading-6">{{ item.name }}</a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end" />
      </nav>
      <Dialog as="div" class="lg:hidden" :open="mobileMenuOpen" @close="mobileMenuOpen = false">
        <div class="fixed inset-0 z-50" />
        <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div class="flex items-center justify-between">
            <a href="#" class="p-1.5 -m-1.5">
              <span class="sr-only">Your Company</span>
              <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
            </a>
            <button type="button" class="rounded-md p-2.5 text-gray-700 -m-2.5" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-6 flow-root">
            <div class="-my-6 divide-y divide-gray-500/10">
              <div class="py-6 space-y-2">
                <a v-for="item in navigation" :key="item.name" :href="item.href" class="block rounded-lg px-3 py-2 text-base text-gray-900 font-semibold leading-7 -mx-3 hover:bg-gray-50">{{ item.name }}</a>
              </div>
              <div class="py-6" />
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>

    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 lg:py-56 sm:py-48">
        <div class="text-center">
          <h1 class="text-4xl text-gray-900 font-bold tracking-tight sm:text-6xl">
            Bem-vindo ao controle financeiro
          </h1>
          <p class="mt-6 text-lg text-gray-600 leading-8">
            Aqui você pode monitorar suas transações e manter controle sobre suas finanças.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/TransactionsPage" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm text-white font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600 focus-visible:outline-offset-2 focus-visible:outline">
              Adicionar transações
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
