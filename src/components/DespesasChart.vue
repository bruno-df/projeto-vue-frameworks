<script setup>
import { computed, ref, onMounted } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useFinanceStore } from '../stores/financeStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const store = useFinanceStore()
const loaded = ref(false)

onMounted(() => {
  loaded.value = true
})

// Filtra apenas as transações do tipo 'expense' (Despesa)
const expenses = computed(() => {
  return store.transactions.filter(t => t.type === 'expense')
})

const chartData = computed(() => {
  return {
    // Os rótulos serão os nomes das despesas (ex: 'Servidor Cloud')
    labels: expenses.value.map(t => t.title),
    datasets: [
      {
        label: 'Valor (R$)',
        // Cor VERMELHA para despesas
        backgroundColor: '#f87171', 
        // Cor ao passar o rato (um pouco mais escura)
        hoverBackgroundColor: '#ef4444',
        // Os valores de cada despesa
        data: expenses.value.map(t => t.amount),
        borderRadius: 6,
        barThickness: 40 // Largura da barra
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false }, // Esconde a legenda pois só há um tipo de dado
    tooltip: {
      backgroundColor: '#1e1b2e',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(248, 113, 113, 0.3)', // Borda vermelha no tooltip
      borderWidth: 1,
      callbacks: {
        label: function(context) {
          return `R$ ${context.raw.toFixed(2)}`
        }
      }
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
  height: 300px;
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