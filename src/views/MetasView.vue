<template>
  <div class="metas-container">
    <div class="actions">
      <button class="btn-add" @click="addMock">Nova Meta +</button>
    </div>
    <div class="goals-grid">
      <GoalProgress v-for="g in store.goals" :key="g.id" :goal="g" />
    </div>
  </div>
</template>

<script setup>
import GoalProgress from '../components/GoalProgress.vue'
import { useGoalsStore } from '../stores/goalsStore'

const store = useGoalsStore()

function addMock() {
  store.addGoal({ title: 'Nova Conquista', current: 0, target: 5000 })
}
</script>

<style scoped>
.actions { margin-bottom: 20px; text-align: right; }
.btn-add {
  background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;
}
</style>