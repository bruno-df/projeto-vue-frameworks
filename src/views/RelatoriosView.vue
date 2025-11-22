<template>
  <div class="relatorios-view">
    
    <div class="report-card full-width">
      <EvolutionChart />
    </div>

    <div class="grid-2">
      
      <div class="report-card">
        <h2>Comparativo Total</h2>
        <ExpenseChart />
      </div>
      
      <div class="report-card">
        <DistributionChart />
      </div>

    </div>

    <div class="report-card">
      <h2>Resumo Numérico</h2>
      <ul class="stats-list">
        <li>
          <span>Total Entradas:</span>
          <span class="text-green">R$ {{ store.totalIncome.toFixed(2) }}</span>
        </li>
        <li>
          <span>Total Saídas:</span>
          <span class="text-red">R$ {{ store.totalExpense.toFixed(2) }}</span>
        </li>
        <li class="total">
          <span>Balanço:</span>
          <span :class="store.balance >= 0 ? 'text-green' : 'text-red'">
            R$ {{ store.balance.toFixed(2) }}
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import EvolutionChart from '../components/EvolutionChart.vue'
import ExpenseChart from '../components/ExpenseChart.vue'
import DistributionChart from '../components/DistributionChart.vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
</script>

<style scoped>
.relatorios-view { padding-bottom: 20px; }

.report-card {
  background: var(--color-card, #1e1b2e);
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  color: white;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.report-card h2 { color: #d8b4fe; margin-bottom: 15px; font-size: 1.1rem; }
.full-width { width: 100%; }

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.stats-list { list-style: none; padding: 0; }
.stats-list li {
  display: flex; justify-content: space-between; padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.stats-list li.total { font-weight: bold; font-size: 1.1rem; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none; margin-top: 10px; }
.text-green { color: #4ade80; }
.text-red { color: #f87171; }

@media (max-width: 900px) {
  .grid-2 { grid-template-columns: 1fr; }
}
</style>