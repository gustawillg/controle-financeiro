<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  components: {
    Icon,
  },
  data() {
    return {
      transactions: [
        { id: 1, description: 'Compra de mantimentos', amount: -50, date: new Date(), category: 'Compras', type: 'despesa' },
        { id: 2, description: 'Salário', amount: 1000, date: new Date() },
      ],
      showForm: false,
      newTransaction: {
        description: '',
        amount: 0,
        category: '',
        type: 'receita',
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
        type: 'receita',
      }
      this.showForm = false
    },
  },
})
</script>

<template>
  <div class="flex flex-nowrap bg-white pt-12">
    <!-- Movemos o componente TransactionList abaixo do bloco v-if -->
    <TransactionList :transactions="transactions" class="relative isolate basis-1/4 border-r-3 px-6 pt-14 lg:px-20" @transactiondeleted="handleTransactionDeleted" />
    <!-- Botão ou gatilho para adicionar nova transação -->
    <div class="relative isolate grid grid-flow-col grid-rows-4 flex flex-nowrap gap-4 px-6 pt-14 lg:px-8">
      <button @click="showAddTransactionForm">
        <div class="hover:text-indigo-600">
          <Icon icon="material-symbols:add" width="25" high="25" />
        </div>
      </button>

      <div v-if="showForm" class="grid row-span-3 grid-rows-subgrid gap-4 px-6 lg:px-8">
        <h2>Nova Transação</h2>
        <form @submit.prevent="addTransaction">
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
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
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
