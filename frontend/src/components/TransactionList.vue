<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  components: {
    Icon,
  },
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
    <h2 class="px-10">
      Lista de Transações
    </h2>
    <ul>
      <!-- Iterar sobre as transações e exibi-las -->
      <li v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.description }} - R$ {{ transaction.amount.toFixed(2) }} - Data: {{ new Date(transaction.date).toLocaleDateString() }} - Categoria: {{ transaction.category }} - Tipo: {{ transactions.type }}
        <div class="px-6">
          <button class="hover:text-indigo-500" @click="deleteTransaction(transaction.id)">
            <Icon icon="mdi:delete-empty" width="15" height="15" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
