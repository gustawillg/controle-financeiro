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
      this.transactions = this.transactions.filter(transaction => transaction.id ! === id)
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
  <div>
    <h1>Bem-vindo ao Controle Financeiro</h1>
    <p>
      Aqui você monitora e mantem o controle sobre suas finanças
    </p>
    <TransactionList :transactions="transactions" @transactiondeleted="handleTransactionDeleted" />
    <button @click="showAddTransactionForm">
      Adicionar Transação
    </button>
    <div v-if="showForm">
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
</template>

<route lang="yaml">
meta:
  layout: home
</route>
