<template>
  <div class="invest-card">
    <div class="top-row">
      <div class="title-area">
        <div class="icon-placeholder">💎</div>
        <h3>{{ investment.name }}</h3>
      </div>
    </div>

    <div class="info-row">
      <div class="value-block">
        <small>Valor Atual</small>
        <p>R$ {{ investment.value.toFixed(2) }}</p>
      </div>
      <div class="yield" :class="isPositive ? 'pos' : 'neg'">
        {{ investment.yield }}
      </div>
    </div>

    <div class="actions-row">
      <button class="btn-action btn-redeem" @click="$emit('update-money', { investment, type: 'redeem' })">
        - Resgatar
      </button>
      <button class="btn-action btn-invest" @click="$emit('update-money', { investment, type: 'invest' })">
        + Aportar
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['investment'])
defineEmits(['update-money'])

const isPositive = computed(() => props.investment.yield.includes('+'))
</script>

<style scoped>
.invest-card {
  background: var(--color-card, #1e1b2e);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(139, 92, 246, 0.1);
  transition: transform 0.2s;
}
.invest-card:hover { border-color: #8b5cf6; transform: translateY(-3px); }

.top-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
.title-area { display: flex; align-items: center; gap: 10px; }
.icon-placeholder { width: 32px; height: 32px; background: rgba(139, 92, 246, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; }
.title-area h3 { margin: 0; font-size: 1rem; color: white; }

.info-row { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; }
.value-block small { color: #94a3b8; font-size: 0.8rem; }
.value-block p { margin: 0; color: white; font-size: 1.2rem; font-weight: bold; }

.yield { font-weight: bold; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
.yield.pos { background: rgba(74, 222, 128, 0.1); color: #4ade80; }
.yield.neg { background: rgba(248, 113, 113, 0.1); color: #f87171; }

.actions-row { display: flex; gap: 10px; }
.btn-action { flex: 1; padding: 8px; border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; border: 1px solid transparent; background: transparent; transition: all 0.2s; }
.btn-invest { border-color: #8b5cf6; color: #8b5cf6; }
.btn-invest:hover { background: #8b5cf6; color: white; }
.btn-redeem { border-color: #ef4444; color: #ef4444; }
.btn-redeem:hover { background: #ef4444; color: white; }
</style>