<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      showForm: false,
      newTransaction: {
        description: '',
        amount: 0,
      },
    }
  },
  methods: {
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
  <div>
    <!-- Seu conteúdo existente -->

    <!-- Botão ou gatilho para adicionar nova transação -->
    <button @click="showAddTransactionForm">
      Adicionar Transação
    </button>

    <!-- Formulário/modal para adicionar nova transação -->
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
