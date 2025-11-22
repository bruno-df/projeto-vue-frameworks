<template>
  <div class="chart-container">
    <h3 class="chart-title">Evolução Mensal (Entradas vs Saídas)</h3>
    <Line v-if="loaded" :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { useFinanceStore } from '../stores/financeStore'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const store = useFinanceStore()
const loaded = ref(false)

onMounted(() => {
  loaded.value = true
})

const processedData = computed(() => {
  const grouped = {}

  store.transactions.forEach(t => {
    const monthKey = t.date.substring(0, 7)

    if (!grouped[monthKey]) {
      grouped[monthKey] = { income: 0, expense: 0 }
    }

    if (t.type === 'income') grouped[monthKey].income += t.amount
    if (t.type === 'expense') grouped[monthKey].expense += t.amount
  })

  const sortedMonths = Object.keys(grouped).sort()

  return {
    labels: sortedMonths,
    incomeData: sortedMonths.map(m => grouped[m].income),
    expenseData: sortedMonths.map(m => grouped[m].expense)
  }
})

const chartData = computed(() => {
  return {
    labels: processedData.value.labels,
    datasets: [
      {
        label: 'Entradas',
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.1)',
        data: processedData.value.incomeData,
        tension: 0.4,
        fill: true
      },
      {
        label: 'Saídas',
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        data: processedData.value.expenseData,
        tension: 0.4,
        fill: true
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: { labels: { color: '#e2e8f0' } },
    tooltip: {
      backgroundColor: '#1e1b2e',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      borderWidth: 1
    }
  },
  scales: {
    y: {
      ticks: { color: '#94a3b8' },
      grid: { color: 'rgba(255, 255, 255, 0.05)' },
      beginAtZero: true
    },
    x: {
      ticks: { color: '#94a3b8' },
      grid: { display: false }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 350px;
  width: 100%;
  padding: 10px;
}
.chart-title {
  color: #d8b4fe;
  font-size: 1rem;
  margin-bottom: 15px;
  font-weight: normal;
}
</style>