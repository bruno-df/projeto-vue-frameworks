<template>
  <div class="chart-container">
    <div class="header-row">
      <h3>Distribuição (%)</h3>
      <button class="btn-view-cat" @click="showCategoryModal = true">
        Ver Categorias
      </button>
    </div>

    <div class="chart-wrapper">
      <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
      <div v-if="store.transactions.length === 0" class="no-data">Sem dados</div>
    </div>

    <CategoryBreakdownModal 
      v-if="showCategoryModal" 
      @close="showCategoryModal = false" 
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useFinanceStore } from '../stores/financeStore'
import CategoryBreakdownModal from './CategoryBreakdownModal.vue'

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const store = useFinanceStore()
const loaded = ref(false)
const showCategoryModal = ref(false)

onMounted(() => {
  loaded.value = true
})

const chartData = computed(() => {
  return {
    labels: ['Entradas', 'Saídas'],
    datasets: [
      {
        backgroundColor: ['#4ade80', '#f87171'],
        borderColor: '#1e1b2e',
        borderWidth: 4,
        data: [store.totalIncome, store.totalExpense]
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: { color: '#e2e8f0', boxWidth: 12, padding: 15 }
    },
    tooltip: {
      enabled: true
    },

    datalabels: {
      color: '#ffffff',
      font: {
        weight: 'bold',
        size: 14
      },
      formatter: (value, ctx) => {
        let sum = 0;
        let dataArr = ctx.chart.data.datasets[0].data;
        
        dataArr.map(data => {
          sum += data;
        });
        if (sum === 0 || value === 0) return '';
        let percentage = (value * 100 / sum).toFixed(1) + "%";
        return percentage;
      }
    }
  }
}
</script>

<style scoped>
.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

h3 { margin: 0; color: #d8b4fe; font-size: 1rem; font-weight: normal; }

.btn-view-cat {
  background: transparent;
  border: 1px solid #8b5cf6;
  color: #8b5cf6;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: all 0.2s;
}

.btn-view-cat:hover {
  background: #8b5cf6;
  color: white;
}

.chart-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
h3 { color: #d8b4fe; font-size: 1rem; margin-bottom: 15px; font-weight: normal; }
.chart-wrapper {
  flex: 1;
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.no-data { position: absolute; color: #64748b; font-size: 0.9rem; }
</style>