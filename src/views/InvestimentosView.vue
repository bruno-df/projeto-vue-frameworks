<template>
  <div class="investimentos-view">
    <div class="header-actions">
      <div class="title-group">
        <h2>Carteira de Ativos</h2>
        <div class="balance-display">
          <span>Disponível em conta:</span>
          <span class="balance-value">R$ {{ financeStore.balance.toFixed(2) }}</span>
        </div>
      </div>
      <button class="btn-add" @click="showCreateModal = true">Novo Ativo +</button>
    </div>
    
    <div class="invest-list">
      <p v-if="store.investments.length === 0" class="empty-msg">
        Nenhum investimento cadastrado.
      </p>

      <InvestmentCard 
        v-for="inv in store.investments" 
        :key="inv.id" 
        :investment="inv" 
        @update-money="openUpdateModal"
      />
    </div>

    <InvestmentModal 
      v-if="showCreateModal" 
      @close="showCreateModal = false" 
      @save="handleCreate"
    />

    <InvestmentUpdateModal
      v-if="showUpdateModal"
      :assetName="selectedAsset?.name"
      :assetValue="selectedAsset?.value"
      :mode="operationType"
      @close="closeUpdateModal"
      @save="handleUpdateBalance"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InvestmentCard from '../components/InvestmentCard.vue'
import InvestmentModal from '../components/InvestmentModal.vue'
import InvestmentUpdateModal from '../components/InvestmentUpdateModal.vue'
import { useInvestmentsStore } from '../stores/investmentsStore'
import { useFinanceStore } from '../stores/financeStore'

const store = useInvestmentsStore()
const financeStore = useFinanceStore()
const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const selectedAsset = ref(null)
const operationType = ref('invest')

function handleCreate(data) {
    if(data.value > financeStore.balance) {
        alert("Saldo insuficiente para realizar este investimento inicial");
        return;
    }
    store.addInvestment(data)

    financeStore.addTransaction({
        title: `Investimento incial: ${data.name}`,
        amount: data.value,
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        category: 'Outros'
    })
    showCreateModal.value = false;
}

function openUpdateModal(payload) {
  selectedAsset.value = payload.investment
  operationType.value = payload.type
  showUpdateModal.value = true
}

function closeUpdateModal() {
  selectedAsset.value = null
  showUpdateModal.value = false
}

function handleUpdateBalance(amount) {
  if (!selectedAsset.value) return

  if (operationType.value === 'invest') {
    store.invest(selectedAsset.value.id, amount)
    
    financeStore.addTransaction({
      title: `Aporte: ${selectedAsset.value.name}`,
      amount: amount,
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'Outros' 
    })

  } else {
    store.redeem(selectedAsset.value.id, amount)
    
    financeStore.addTransaction({
      title: `Resgate: ${selectedAsset.value.name}`,
      amount: amount,
      type: 'income', 
      date: new Date().toISOString().split('T')[0],
      category: 'Outros'
    })
  }

  closeUpdateModal()
}
</script>

<style scoped>
.header-actions {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;
}
.title-group { display: flex; flex-direction: column; gap: 5px; }
.header-actions h2 { color: #fff; margin: 0; }
.balance-display { font-size: 0.9rem; color: #94a3b8; display: flex; gap: 8px; align-items: center; }
.balance-value { color: #4ade80; font-weight: bold; font-size: 1rem; background: rgba(74, 222, 128, 0.1); padding: 2px 8px; border-radius: 6px; }

.btn-add {
  background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; height: fit-content;
}
.btn-add:hover { background: #7c3aed; }
.empty-msg { color: #64748b; text-align: center; margin-top: 40px; }
.invest-list { display: flex; flex-direction: column; gap: 10px; }
</style>