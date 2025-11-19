<template>
  <DespesasChart />
  <div class="relatorios-view">
      <h2>Análise Financeira</h2>
      <p>Comparativo de Receitas e Despesas em tempo real.</p>
      <ExpenseChart />
    </div>

    <div class="grid-2">
      <div class="report-card">
        <h2>Resumo</h2>
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
import ExpenseChart from '../components/ExpenseChart.vue'
import { useFinanceStore } from '../stores/financeStore'
import DespesasChart from '../components/DespesasChart.vue'

const store = useFinanceStore()
</script>

<style scoped>
.relatorios-view { padding-bottom: 20px; }
.report-card {
  background: #1e1b2e;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 20px;
  color: white;
  border: 1px solid rgba(139, 92, 246, 0.1);
}
.report-card h2 { color: #d8b4fe; margin-bottom: 10px; }
.full-width { width: 100%; }

/* Grid layout para telas maiores */
.grid-2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.stats-list { list-style: none; padding: 0; margin-top: 20px; }
.stats-list li {
  display: flex; justify-content: space-between; padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.stats-list li.total { font-weight: bold; font-size: 1.1rem; border-top: 1px solid rgba(255,255,255,0.1); border-bottom: none; margin-top: 10px; }
.text-green { color: #4ade80; }
.text-red { color: #f87171; }
</style>