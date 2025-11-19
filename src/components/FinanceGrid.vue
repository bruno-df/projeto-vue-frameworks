<template>
  <div class="finance-grid">
    <div v-for="item in transactions" :key="item.id" class="grid-item">
      <div class="info">
        <span class="title">{{ item.title }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
      <div class="amount" :class="item.type">
        {{ item.type === 'income' ? '+' : '-' }} R$ {{ item.amount.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFinanceStore } from '../stores/financeStore'
import { computed } from 'vue'

const store = useFinanceStore()
const transactions = computed(() => store.transactions)
</script>

<style scoped>
.finance-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #110e1b;
  padding: 20px;
  border-radius: 12px;
}
.grid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  border-left: 3px solid transparent;
}
.grid-item:hover {
  background: rgba(139, 92, 246, 0.1);
}
.amount.income { color: #4ade80; border-left-color: #4ade80; }
.amount.expense { color: #f87171; border-left-color: #f87171; }
.info { display: flex; flex-direction: column; }
.title { color: #fff; font-weight: 500; }
.date { font-size: 0.8rem; color: #6b7280; }
</style>