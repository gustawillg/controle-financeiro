<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    transactions: Array, // Propriedade para receber a lista de transações
  },
  methods: {
    deleteTransaction(id: number) {
      // Emitir um evento para notificar o componente pai sobre a exclusão
      this.$emit('transactiondeleted', id)
    },
  },
})
</script>

<template>
  <div>
    <h2>Lista de Transações</h2>
    <ul>
      <!-- Iterar sobre as transações e exibi-las -->
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.description }} - R$ {{ transaction.amount.toFixed(2) }}
        <button @click="deleteTransaction(transaction.id)">
          Deletar
        </button>
      </li>
    </ul>
  </div>
</template>
