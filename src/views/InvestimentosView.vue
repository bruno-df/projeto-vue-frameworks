<template>
  <div>
    <div class="actions">
      <button class="btn-add" @click="addMock">Novo Ativo +</button>
    </div>
    <div class="invest-list">
      <InvestmentCard 
        v-for="inv in store.investments" 
        :key="inv.id" 
        :investment="inv" 
      />
    </div>
  </div>
</template>

<script setup>
import InvestmentCard from '../components/InvestmentCard.vue'
import { useInvestmentsStore } from '../stores/investmentsStore'

const store = useInvestmentsStore()

function addMock() {
  store.addInvestment({ name: 'Novo Fundo Imob.', value: 1000, yield: '+0.5%' })
}
</script>

<style scoped>
.actions { margin-bottom: 20px; display: flex; justify-content: flex-end; }
.btn-add {
  background: #8b5cf6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
.btn-add:hover { background: #7c3aed; }
</style>