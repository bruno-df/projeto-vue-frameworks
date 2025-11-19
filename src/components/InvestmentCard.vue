<template>
  <div class="invest-card">
    <div class="icon-placeholder">💎</div>
    <div class="content">
      <h3>{{ investment.name }}</h3>
      <p class="value">R$ {{ investment.value }}</p>
    </div>
    <div class="yield" :class="isPositive ? 'pos' : 'neg'">
      {{ investment.yield }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['investment'])
const isPositive = computed(() => props.investment.yield.includes('+'))
</script>

<style scoped>
.invest-card {
  display: flex;
  align-items: center;
  background: #1e1b2e;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 1px solid rgba(139, 92, 246, 0.1);
}
.icon-placeholder {
  width: 40px;
  height: 40px;
  background: rgba(139, 92, 246, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
}
.content { flex: 1; }
.content h3 { color: #fff; font-size: 1rem; margin: 0; }
.content .value { color: #9ca3af; font-size: 0.9rem; margin: 0; }
.yield { font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
.yield.pos { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
.yield.neg { background: rgba(248, 113, 113, 0.1); color: #f87171; }
</style>