<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window large-modal" @click.stop>
      <header>
        <h3>Despesas por Categoria</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <div class="breakdown-container">
        <div class="chart-side">
          <div class="chart-wrapper">
            <Doughnut v-if="loaded" :data="chartData" :options="chartOptions" />
            <div v-if="totalExpenses === 0" class="no-data">Sem despesas</div>
          </div>
        </div>

        <div class="list-side">
          <ul>
            <li v-for="(cat, index) in breakdownData" :key="index">
              <div class="cat-info">
                <span class="dot" :style="{ backgroundColor: cat.color }"></span>
                <span class="name">{{ cat.label }}</span>
              </div>
              <span class="value">R$ {{ cat.value.toFixed(2) }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { useFinanceStore } from '../stores/financeStore'

ChartJS.register(ArcElement, Tooltip)

const store = useFinanceStore()
const loaded = ref(false)

onMounted(() => {
  loaded.value = true
})

const categoryColors = {
  'Casa': '#3b82f6',
  'Alimentação': '#ef4444',
  'Educação': '#a855f7',
  'Lazer': '#22c55e',
  'Saúde': '#ec4899',
  'Transporte': '#eab308',
  'Outros': '#94a3b8'
}

const breakdownData = computed(() => {
  const groups = {}
  let total = 0

  store.transactions.filter(t => t.type === 'expense').forEach(t => {
    const cat = t.category || 'Outros'
    if (!groups[cat]) groups[cat] = 0
    groups[cat] += t.amount
    total += t.amount
  })

  return Object.keys(groups)
    .map(key => ({
      label: key,
      value: groups[key],
      color: categoryColors[key] || '#64748b'
    }))
    .sort((a, b) => b.value - a.value)
})

const totalExpenses = computed(() => {
  return breakdownData.value.reduce((acc, curr) => acc + curr.value, 0)
})

const chartData = computed(() => {
  return {
    labels: breakdownData.value.map(i => i.label),
    datasets: [{
      data: breakdownData.value.map(i => i.value),
      backgroundColor: breakdownData.value.map(i => i.color),
      borderWidth: 0,
      hoverOffset: 4
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          let val = ctx.raw
          let pct = ((val / totalExpenses.value) * 100).toFixed(1) + '%'
          return ` R$ ${val} (${pct})`
        }
      }
    }
  },
  cutout: '65%'
}
</script>

<style scoped>
.large-modal { max-width: 600px; }

.breakdown-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  padding: 10px 0;
}

.chart-side {
  flex: 1;
  height: 200px;
  position: relative;
  display: flex; 
  align-items: center; 
  justify-content: center;
}
.chart-wrapper { width: 100%; height: 100%; }
.no-data { position: absolute; color: #64748b; }

.list-side {
  flex: 1.2;
}

.list-side ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-side li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
}
.list-side li:last-child { border-bottom: none; }

.cat-info { display: flex; align-items: center; gap: 10px; }

.dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.name { color: #e2e8f0; }
.value { font-weight: bold; color: #fff; }

@media (max-width: 600px) {
  .breakdown-container { flex-direction: column; }
  .chart-side { height: 180px; width: 100%; }
  .list-side { width: 100%; }
}
</style>