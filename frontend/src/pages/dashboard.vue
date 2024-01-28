<template>
  <div>
    <Navbar />
    <div class="py-20 px-20">
      <FinancialSummary :entry="userEntry" :expense="userExpense" />
      <Transactions :transactions="filteredTransactions" />
      <Calendario @dateSelected="updateTransactions" />
      <Filtro :allCategories="allCategories" @filters-updated="updateFilters" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FinancialSummary from '../components/FinancialSummary.vue';
import Calendar from '../components/Calendario.vue';
import TransactionList from '../components/TransactionList.vue';
import Filtro from '../components/Filtro.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    FinancialSummary,
    Calendar,
    TransactionList,
    Filtro,
  },
  data() {
    return {
      userEntry: 1000,
      userExpense: 500,
      selectedDate: new Date().toISOString().split('T')[0],
      transactions: [] as Transaction[],
      currentFilters: {
        type: '',
        category: '',
      },
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter((transaction) => {
        const typeFilter = !this.currentFilters.type || transaction.type === this.currentFilters.type;
        const categoryFilter = !this.currentFilters.category || transaction.category === this.currentFilters.category;
        return typeFilter && categoryFilter && transaction.date.toDateString() === new Date(this.selectedDate).toDateString();
      });
    },
  },
  methods: {
    updateTransactions(selectedDate: Date) {
      this.selectedDate = selectedDate.toISOString().split('T')[0];
      console.log('data selecionada:', this.selectedDate); // Use this.selectedDate em vez de selectedDate
      this.applyFilters(); // Chame a função applyFilters para atualizar com os filtros aplicados
    },
    updateFilters(newFilters) {
      this.currentFilters = newFilters;
      this.applyFilters(); // Chame a função applyFilters quando os filtros são atualizados
    },
    applyFilters() {
      // Lógica para atualizar as transações com base nos filtros
      // Normalmente, isso envolve chamar a API para obter transações filtradas
      // Aqui, você pode atualizar this.transactions com as transações filtradas
    },
  },
  watch: {
    selectedDate() {
      // Lógica adicional ao alterar a data selecionada
      // Por exemplo, buscar novas transações da API
    },
  },
});
</script>
