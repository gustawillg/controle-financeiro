<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  components: {
    Icon,
  },
  props: {
    transactions: Array, 
  },
  methods: {
    deleteTransaction(id: number) {
     
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
      <li v-for="transaction in transactions || []" :key="transaction.id">
        {{ transaction.description }} - R${{ transaction.amount.toFixed(2) }} - Categoria: {{ transaction.category }} - Tipo: {{ transaction.type }}
        <div class="px-6">
          <button class="hover:text-indigo-500" @click="deleteTransaction(transaction.id)">
            <Icon icon="mdi:delete-empty" width="15" height="15" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
