<template>
    <div>
      <line-chart :data="chartData" :options="chartOptions"></line-chart>
    </div>
  </template>
  
  <script>
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

app.use(VueChartkick)

  </script>
  

  