<template>
    <div class="flex justify-content: space-around mt-20">
        <div class="text-center">
            <p>Entrada:</p>
            <span class="block font-bold bg-green">{{ formatCurrency(entry) }}</span>
            <span class="block font-bold bg-green">{{ calculatePercentage(entry) }}%</span>
        </div>
        <div class="text-center">
            <p>Saída:</p>
            <span class="block font-bold bg-red">{{ formatCurrency(expense) }}</span>
            <span class="block font-bold bg-red">{{ calculatePercentage(expense) }}%</span>
        </div>
        <div class="text-center">
            <p>Saldo Total:</p>
            <span class="block font-bold">{{ formatCurrency(total) }}</span>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'FinancialSummary',
    props: {
        entry: {
            type: Number,
            default: 0,
        },
        expense: {
            type: Number,
            default: 0,
        },
    },
    setup(props) {
        // Cálculo do saldo total
        const total = computed(() => props.entry - props.expense);

        // Função para calcular a porcentagem
        const calculatePercentage = (value: number) => {
            if (total.value === 0) return 0;
            return ((value / total.value) * 100).toFixed(2);
        };

        // Função para formatar valores como moeda
        const formatCurrency = (value: number) => {
            return value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
        };

        return {
            total,
            calculatePercentage,
            formatCurrency,
        };
    },
});
</script>
  
