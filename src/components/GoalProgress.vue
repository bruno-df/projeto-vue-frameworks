<template>
  <div class="goal-card">
    
    <div class="top-row">
      <h4 class="goal-title">{{ goal.title }}</h4>
      
      <div class="management-actions">
        <button @click="$emit('edit', goal)" class="btn-icon-sm" title="Editar">✏️</button>
        <button @click="$emit('delete', goal.id)" class="btn-icon-sm btn-trash" title="Excluir">🗑️</button>
      </div>
    </div>

    <div class="money-row">
      <span class="percentage">{{ percentage }}%</span>
      <div class="buttons-wrapper">
        <button 
          class="btn-icon btn-remove" 
          @click="$emit('update-money', { goal, type: 'withdraw' })" 
          title="Retirar valor"
        >
          -
        </button>
        <button 
          class="btn-icon btn-add" 
          @click="$emit('update-money', { goal, type: 'deposit' })" 
          title="Adicionar valor"
        >
          +
        </button>
      </div>
    </div>

    <div class="progress-bar">
      <div class="fill" :style="{ width: percentage + '%' }"></div>
    </div>
    
    <div class="details">
      <small>Atual: <span class="highlight">R$ {{ goal.current.toFixed(2) }}</span></small>
      <small>Meta: R$ {{ goal.target.toFixed(2) }}</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['goal'])
defineEmits(['update-money', 'edit', 'delete'])

const percentage = computed(() => {
  if (props.goal.target === 0) return 0
  return Math.min(100, Math.round((props.goal.current / props.goal.target) * 100))
})
</script>

<style scoped>
.goal-card {
  background: var(--color-card, #1e1b2e);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: transform 0.2s;
}
.goal-card:hover { border-color: #8b5cf6; }

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.goal-title {
  color: #d8b4fe;
  margin: 0;
  font-size: 1rem;
}

.management-actions {
  display: flex;
  gap: 8px;
}

.btn-icon-sm {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}
.btn-icon-sm:hover { opacity: 1; }
.btn-trash:hover { filter: grayscale(100%) brightness(0.8) sepia(1) hue-rotate(-50deg) saturate(5); }

.money-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.percentage { font-weight: bold; color: white; }
.buttons-wrapper { display: flex; gap: 8px; }

.btn-icon {
  width: 26px; height: 26px;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 0;
  padding-bottom: 3px;
  transition: all 0.2s;
  background: transparent;
}

.btn-add { border: 1px solid #a855f7; color: #a855f7; }
.btn-add:hover { background: #a855f7; color: white; }

.btn-remove { border: 1px solid #ef4444; color: #ef4444; }
.btn-remove:hover { background: #ef4444; color: white; }

.progress-bar {
  width: 100%; height: 8px; background: #0f0c16;
  border-radius: 4px; overflow: hidden; margin-bottom: 10px;
}
.fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #d8b4fe);
  transition: width 0.5s ease;
}

.details { display: flex; justify-content: space-between; color: #9ca3af; }
.highlight { color: #4ade80; }
</style>