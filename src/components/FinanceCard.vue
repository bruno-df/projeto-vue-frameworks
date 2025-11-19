<template>
  <div class="finance-card" :class="type">
    <h3>{{ title }}</h3>
    <p class="value">R$ {{ value.toFixed(2) }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  type: { type: String, default: 'neutral' } // income, expense, neutral
})
</script>

<style scoped>
.finance-card {
  background: linear-gradient(145deg, #1e1b2e, #161321);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  color: white;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  transition: transform 0.2s;
}
.finance-card:hover {
  transform: translateY(-5px);
  border-color: #8b5cf6;
}
.finance-card h3 {
  font-size: 0.9rem;
  color: #a1a1aa;
  margin-bottom: 10px;
}
.finance-card.income .value { color: #4ade80; }
.finance-card.expense .value { color: #f87171; }
.finance-card.neutral .value { color: #d8b4fe; }
.value {
  font-size: 1.8rem;
  font-weight: bold;
}
</style>