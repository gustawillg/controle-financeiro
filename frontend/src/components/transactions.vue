<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  components: {
    Icon,
  },
  data() {
    return {
      transactions: [],
      showForm: false,
      newTransaction: {
        description: '',
        amount: 0,
        category: '',
        type: '',
      },
    }
  },
  methods: {
    handleTransactionDeleted(id: number) {
      this.transactions = this.transactions.filter(transaction => transaction.id !== id)
    },
    leTransactionAdded(newTransaction: any) {
      this.transactions.push(newTransaction)
    },
    showAddTransactionForm() {
      this.showForm = true
    },
    addTransaction() {
      const currentDate = new Date()
      this.transactions.push({
        id: this.transactions.length + 1,
        description: this.newTransaction.description,
        amount: Number.parseFloat(this.newTransaction.amount),
        date: currentDate,
        category: this.newTransaction.category,
        type: this.newTransaction.type,
      })

      this.newTransaction = {
        description: '',
        amount: 0,
        category: '',
        type: '',
      }
      this.showForm = false
    },
  },
})
</script>

<template>
  <div class="flex flex-nowrap bg-white pt-12">
    <!-- Movemos o componente TransactionList abaixo do bloco v-if -->
    <TransactionList :transactions="transactions" class="relative isolate basis-1/4  px-6 pt-14 lg:px-20" @transactiondeleted="handleTransactionDeleted" />
    <!-- Botão ou gatilho para adicionar nova transação -->
    <div class="relative  isolate grid grid-flow-col grid-rows-4 flex flex-nowrap gap-4 px-2 pt-14">
      <button @click="showAddTransactionForm">
        <div class="hover:text-indigo-600">
          <Icon icon="material-symbols:add" width="25" high="25" />
        </div>
      </button>

      <div v-if="showForm" class="grid row-span-3 grid-rows-subgrid gap-4 lg:pr-60  xl:pr-190 2xl:pr-190 sm:pr-100">
       
        <form @submit.prevent="addTransaction">
          <h2 class="p-10">Nova Transação</h2>
          <label>
            Descrição:
            <input v-model="newTransaction.description" required type="text">
          </label>

          <label>
            Valor:
            <input v-model="newTransaction.amount" type="number" required>
          </label>
          <label>
            Categoria:
            <input v-model="newTransaction.category" required>
          </label>

          <label>
            Tipo:
            <select v-model="newTransaction.type" required>
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
            </select>
          </label>

          <button type="submit" class="px-6 hover:text-indigo-500">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
