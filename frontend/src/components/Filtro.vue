<template>
  <div class="absolute bottom-0 right-100 h-215 w-0 
  2xl:bottom-100 2xl:right-70 2xl:h-115 
  xl:bottom-100 xl:right-70 xl:h-70 
  lg:bottom-100 lg:right-70 lg:h-70">

    <button @click="toggleForm">
      <Icon icon="ion:filter" width="24" height="24" />
    </button>

    <div v-if="showForm">
      <label for="filterType">Tipo:</label>
      <select v-model="selectedType">
        <option value="">Todos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>

      <label for="filterCategory">Categoria:</label>
      <select v-model="selectedCategory">
        <option value="">Todas</option>
        <option v-for="category in userCategories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <button @click="applyFilters">
        <Icon icon="pajamas:check" width="20" height="20" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
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
  methods: {
    applyFilters() {
      this.$emit("filters-updated", {
        type: this.selectedType,
        category: this.selectedCategory,
      });

      this.showForm = false;
    },
    toggleForm() {
      this.showForm = !this.showForm;
    },
  },
  props: {
    userCategories: Array,
  },
});
</script>
