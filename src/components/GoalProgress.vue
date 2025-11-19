<template>
  <div class="goal-card">
    <div class="header">
      <h4>{{ goal.title }}</h4>
      <span>{{ percentage }}%</span>
    </div>
    <div class="progress-bar">
      <div class="fill" :style="{ width: percentage + '%' }"></div>
    </div>
    <div class="details">
      <small>Atual: R$ {{ goal.current }}</small>
      <small>Meta: R$ {{ goal.target }}</small>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps(['goal'])

const percentage = computed(() => {
  return Math.min(100, Math.round((props.goal.current / props.goal.target) * 100))
})
</script>

<style scoped>
.goal-card {
  background: #1e1b2e;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  border: 1px solid rgba(139, 92, 246, 0.2);
}
.header {
  display: flex;
  justify-content: space-between;
  color: #d8b4fe;
  margin-bottom: 10px;
}
.progress-bar {
  width: 100%;
  height: 8px;
  background: #0f0c16;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 10px;
}
.fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #d8b4fe);
  transition: width 0.5s ease;
}
.details {
  display: flex;
  justify-content: space-between;
  color: #9ca3af;
}
</style>