<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      transactions: [
        { id: 1, description: 'Compra de mantimentos', amount: -50 },
        { id: 2, description: 'Salário', amount: 1000 },
        // ... outras transações ...
      ],
      showForm: false,
      newTransaction: {
        description: '',
        amount: 0,
      },
    }
  },
  methods: {
    handleTransactionDeleted(id: number) {
      this.transactions = this.transactions.filter(transaction => transaction.id !== id)
    },
    showAddTransactionForm() {
      this.showForm = true
    },
    addTransaction() {
      // Lógica para adicionar a nova transação à lista existente
      this.transactions.push({
        id: this.transactions.length + 1,
        description: this.newTransaction.description,
        amount: Number.parseFloat(this.newTransaction.amount),
      })

      // Reinicializa o formulário e esconde o formulário
      this.newTransaction = {
        description: '',
        amount: 0,
      }
      this.showForm = false
    },
  },
})
</script>

<template>
  <Navbar />
  <div class="flex flex-nowrap bg-white pt-12">
    <!-- Movemos o componente TransactionList abaixo do bloco v-if -->
    <TransactionList :transactions="transactions" class="relative isolate basis-1/4 border-r-3 px-6 pt-14 lg:px-8" @transactiondeleted="handleTransactionDeleted" />

    <!-- Botão ou gatilho para adicionar nova transação -->
    <div class="relative isolate grid grid-flow-col grid-rows-4 flex flex-nowrap gap-4 px-6 pt-14 lg:px-8">
      <button class="hover:bg-blue" @click="showAddTransactionForm">
        <div class="">
          Adicionar Transação
        </div>
      </button>

      <div v-if="showForm" class="grid row-span-3 grid-rows-subgrid gap-4 px-6 lg:px-8">
        <h2>Nova Transação</h2>
        <form @submit.prevent="addTransaction">
          <label>
            Descrição:
            <input v-model="newTransaction.description" required>
          </label>

          <label>
            Valor:
            <input v-model="newTransaction.amount" type="number" required>
          </label>

          <button type="submit">
            Adicionar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
