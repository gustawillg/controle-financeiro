<template>
    <div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="mt-90 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            <div v-for="callout in callouts" :key="callout.name" class="group relative">
              <div class="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img :src="callout.imageSrc" :alt="callout.imageAlt" class="h-full w-full object-cover object-center" />
              </div>
              <h3 class="mt-6 text-sm text-gray-900">
                <a :href="callout.href">
                  <span class="absolute inset-0" />
                  {{ callout.name }}
                </a>
              </h3>
              <p class="text-base font-semibold text-gray-900">{{ callout.description }}</p>
            </div>
          </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  const callouts = [
    {
      name: 'Resumos',
      imageSrc: '../public/resumos4.jpg',
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      href: '#',
    },
    {
      name: 'Relatórios',
      imageSrc: '../public/relatorios.jpg',
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      href: '#',
    },
    {
      name: 'Orçamentos',
      imageSrc: '../public/orçamentos.jpg',
      imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
      href: '#',
    },
  ]
  </script>