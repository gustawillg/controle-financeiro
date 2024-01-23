
<template>
    <div>
      <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
    </div>
  </template>


<script lang="ts">
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        // Opções do gráfico (por exemplo, título, eixos, etc.)
      },
      chartSeries: [
        // Dados do gráfico
        [{ x: 'Data1', y: 10 }, { x: 'Data2', y: 20 }]
      ],
    };
  },
};
</script>