<template>
    <Navbar />
    <div class="py-20 px-20">
        <FinancialSummary :entry="userEntry" :expense="userExpense" />
        <Transactions :transactions="filtredTransactions" />        
        <Calendario @dateSelected="updateTransactions"/>
        <Filtro :allCategories="allCategories" @filters-updated="updateFilters" />

    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FinancialSummary from '../components/FinancialSummary.vue';
import Calendar from '../components/Calendario.vue'; 
import TransactionList from '../components/TransactionList.vue';
import Filtro from '../components/Filtro.vue'




export default defineComponent({
  name: 'Dashboard',
  components: {
    FinancialSummary,
    Calendar,
    TransactionList,
    Filtro
  },
  data() {
    return {
      userEntry: "", 
      userExpense: "", 
      selectedDate: new Date(),
      transactions: [] as Transaction[],
      currentFilters: {
        type: "",
        category: "",
      },
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions.filter((transaction) => {
        const typeFilter = !this.currentFilters.type || transaction.type === this.currentFilters.type;
        const categoryFilter = !this.currentFilters.category || transaction.category === this.currentFilters.category;
        return typeFilter && categoryFilter;
        });
    },
  },
  methods: {
    updateTransactions(selectedDate: Date) {
      this.selectedDate = selectedDate;
      console.log("data selecionada:", selectedDate);
      this.applyFilters();  // Chame a função applyFilters para atualizar com os filtros aplicados
    },
    updateFilters(newFilters) {
      this.currentFilters = newFilters;
    },
  },
  watch: {
    selectedDate(){
    // Lógica adicional ao alterar a data selecionada
    // Por exemplo, buscar novas transações da API
    },
  },
});
</script>