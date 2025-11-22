<template>
  <div class="dashboard">
    
    <div class="dash-header">
      <h2>Visão Geral</h2>
      <button class="btn-action" @click="showModal = true">
        + Nova Transação
      </button>
    </div>

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
        <h2>Dica Financeira</h2>
        <div class="summary-box">
          <p>Manter as despesas abaixo de 70% da renda é o ideal para construir patrimônio.</p>
        </div>
      </div>
    </div>

    <TransactionModal 
      v-if="showModal" 
      @close="showModal = false" 
      @save="handleNewTransaction" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import FinanceCard from '../components/FinanceCard.vue'
import FinanceGrid from '../components/FinanceGrid.vue'
import TransactionModal from '../components/TransactionModal.vue' // Importar
import { useFinanceStore } from '../stores/financeStore'

const finance = useFinanceStore()
const showModal = ref(false) // Controla a visibilidade

// Função que recebe os dados do Modal e envia para o Store
function handleNewTransaction(transactionData) {
  finance.addTransaction(transactionData)
  showModal.value = false // Fecha o modal após salvar
}
</script>

<style scoped>
.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.dash-header h2 { color: white; margin: 0; }

.btn-action {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-action:hover { background: #7c3aed; }

/* Estilos existentes mantidos... */
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
@media (max-width: 768px) {
  .dashboard-grid { grid-template-columns: 1fr; }
}
</style>