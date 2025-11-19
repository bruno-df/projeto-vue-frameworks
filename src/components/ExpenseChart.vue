<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useFinanceStore } from '../stores/financeStore'

// Registar os componentes do Chart.js que vamos usar
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useFinanceStore()

// Dados computados para reagir a mudanças no store
const chartData = computed(() => {
  return {
    labels: ['Financeiro'],
    datasets: [
      {
        label: 'Entradas',
        backgroundColor: '#4ade80', // Verde
        data: [store.totalIncome],
        borderRadius: 5
      },
      {
        label: 'Saídas',
        backgroundColor: '#f87171', // Vermelho
        data: [store.totalExpense],
        borderRadius: 5
      }
    ]
  }
})

// Configurações visuais (Tema Dark)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { color: '#fff' } }
  },
  scales: {
    y: {
      ticks: { color: '#9ca3af' },
      grid: { color: 'rgba(255, 255, 255, 0.1)' }
    },
    x: {
      ticks: { color: '#9ca3af' },
      grid: { display: false }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>