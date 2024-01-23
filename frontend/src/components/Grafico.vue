<template>
    <div>
      <line-chart :data="chartData" :width="400" :height="200"></line-chart>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        chartData: {
          '2022-01-01': 5,
          '2022-01-02': 8,
          '2022-01-03': 3,
          // Adapte para seus dados reais
        },
      };
    },
  };
  </script>
  