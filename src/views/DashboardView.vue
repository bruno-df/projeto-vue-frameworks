<template>
  <div class="dashboard">
    <div class="cards-row">
      <FinanceCard title="Saldo Total" :value="finance.balance" type="neutral" />
      <FinanceCard title="Entradas" :value="finance.totalIncome" type="income" />
      <FinanceCard title="Saídas" :value="finance.totalExpense" type="expense" />
    </div>

    <div class="dashboard-grid">
      <div class="section">
        <h2>Últimos Lançamentos</h2>
        <FinanceGrid />
      </div>
      <div class="section">
        <h2>Resumo Rápido</h2>
        <div class="summary-box">
          <p>Você economizou <strong>25%</strong> a mais este mês.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import FinanceCard from '../components/FinanceCard.vue'
import FinanceGrid from '../components/FinanceGrid.vue'
import { useFinanceStore } from '../stores/financeStore'

const finance = useFinanceStore()
</script>

<style scoped>
.cards-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}
.dashboard-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}
.section h2 { margin-bottom: 15px; color: #d8b4fe; font-size: 1.2rem; }
.summary-box {
  background: #1e1b2e;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #8b5cf6;
  color: #fff;
}
</style>