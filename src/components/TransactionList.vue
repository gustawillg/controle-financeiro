<script lang="ts">
export default defineComponent({
  props: {
    transactions: {
      type: Array as PropType<Array<Transaction>>,
      required: true,
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
        {{ transaction.description }} - {{ transaction.amount }}
      </li>
    </ul>
  </div>
</template>
