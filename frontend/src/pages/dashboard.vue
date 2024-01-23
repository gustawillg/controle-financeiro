<template>
    <Navbar />
    <div class="py-20 px-20">
        <FinancialSummary :entry="userEntry" :expense="userExpense" />
        <Transactions :transactions="filtredTransactions" />        
        <Calendario @dateSelected="updateTransactions"/>
        <Grafico />
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
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
  setup() {
    const userEntry = ref(1000);
    const userExpense = ref(500);
    const selectedDate = ref(new Date());
    const transactions = ref([] as Transaction[]);

    VueChartkick.use(Chart);

    const filteredTransactions = ref([]);
    
    const updateTransactions = (newDate: Date) => {
        selectedDate.value = newDate;
        console.log("data selecionada:", newDate);
    };

    return {
      userEntry,
      userExpense,
      selectedDate,
      transactions,
      filteredTransactions,
      updateTransactions,
    };
  },
  watch: {
    selectedDate() {
        // Lógica adicional ao alterar a data selecionada
        // Por exemplo, buscar novas transações da API
    },
  },
});
</script>