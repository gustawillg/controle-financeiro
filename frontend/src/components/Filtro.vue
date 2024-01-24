<!-- Filtro.vue -->

<template>
  <div class="relative">
    <!-- Botão do ícone -->
    <button @click="toggleForm">
      <Icon icon="mdi:filter" width="24" height="24" />
    </button>

    <!-- Formulário dentro do ícone (usando v-if para mostrar/ocultar) -->
    <div v-if="showForm" class="absolute left-23 top-23 h-16 w-16">
      <label for="filterType">Tipo:</label>
      <select v-model="selectedType">
        <option value="">Todos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>

      <label for="filterCategory">Categoria:</label>
      <select v-model="selectedCategory">
        <option value="">Todas</option>
        <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
      </select>

      <button @click="applyFilters">Aplicar Filtros</button>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '@iconify/vue';


export default defineComponent ({
components: {
    Icon,
  },
    data() {
        return {
            selectedType: "",
            selectedCategory: "",
            showForm: false,
        };
    },
    computed: {
        uniqueCategories() {
            return Array.from(new Set(this.allCategories));
        },
    },
    methods: {
        applyFilters() {
            this.$emit("filters-updated", {
                type: this.selectedType,
                category: this.selectedCategory,
            });
        },
        toggleForm() {
            this.showForm = !this.showForm;  // Alternar o estado showForm
        },
    },
    props: {
        allCategories: Array, // Lista de todas as categorias disponíveis
    },
});
</script>
  