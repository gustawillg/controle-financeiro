<template>
    <div class="flex gap-20 place-content-center">
        <div>
            <p>Entrada:</p>            
            <span class="block font-bold color-green">{{ formatCurrency(entry) }}</span>
        </div>
        <div>
            <p>Saída:</p>
            <span class="block font-bold color-red">{{ formatCurrency(expense) }}</span>
        </div>
        <div>
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

        // Função para formatar valores como moeda
        const formatCurrency = (value: number) => {
            return value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
        };

        return {
            total,
            formatCurrency,
        };
    },
});
</script>
  
