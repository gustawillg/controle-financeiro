<template>
    <Navbar />
    <div class="py-20 px-20">
        <FinancialSummary :entry="userEntry" :expense="userExpense" />
        <Transactions :transactions="filtredTransactions" />        
        <Calendario @dateSelected="updateTransactions"/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import FinancialSummary from '../components/FinancialSummary.vue';
import Calendar from '../components/Calendario.vue'; 
import TransactionList from '../components/TransactionList.vue';
import VueChartkick from 'vue-chartkick';
import Chart from 'chart.js';

Vue.use(VueChartkick, { adapter: Chart });


export default defineComponent({
  name: 'Dashboard',
  components: {
    FinancialSummary,
    Calendar,
    TransactionList,
  },
  data() {
    return {
      userEntry: 1000, 
      userExpense: 500, 
      selectedDate: new Date(),
      transactions: [] as Transaction[],
    };
  },
  computed: {
    filteredTransactions() {
        return this.transactions.filter((transaction) => {
            return transaction.date.toDateString() === this.selectedDate.toDateString();
        });
    },
  },
  methods: {
    updateTransactions(selectedDate: Date) {
        this.selectedDate = selectedDate;
        console.log("data selecionada:", selectedDate)
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