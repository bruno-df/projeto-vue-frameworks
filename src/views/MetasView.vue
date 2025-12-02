<template>
  <div class="metas-container">
    <div class="header-actions">
      <div class="title-group">
        <h2>Meus Objetivos</h2>
        <div class="balance-display">
          <span>Disponível em conta:</span>
          <span class="balance-value">R$ {{ financeStore.balance.toFixed(2) }}</span>
        </div>
      </div>
      <button class="btn-add" @click="showCreateModal = true">Nova Meta +</button>
    </div>

    <div class="goals-grid">
      <GoalProgress 
        v-for="g in store.goals" 
        :key="g.id" 
        :goal="g" 
        @update-money="openUpdateModal"
        @edit="openEditModal"
        @delete="requestDelete" 
      />
      
      <p v-if="store.goals.length === 0" class="empty-msg">
        Defina uma meta para começar a poupar!
      </p>
    </div>

    <GoalModal 
      v-if="showCreateModal" 
      @close="showCreateModal = false" 
      @save="handleCreate"
    />

    <GoalUpdateModal
      v-if="showUpdateModal"
      :goalTitle="selectedGoal?.title"
      :goalBalance="selectedGoal?.current"
      :mode="operationType"
      @close="closeUpdateModal"
      @save="handleUpdateBalance"
    />

    <GoalEditModal
      v-if="showEditModal"
      :goalData="selectedGoal"
      @close="closeEditModal"
      @save="handleEdit"
    />

    <ConfirmDeleteModal
      v-if="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import GoalProgress from '../components/GoalProgress.vue'
import GoalModal from '../components/GoalModal.vue'
import GoalUpdateModal from '../components/GoalUpdateModal.vue'
import GoalEditModal from '../components/GoalEditModal.vue'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue'
import { useGoalsStore } from '../stores/goalsStore'
import { useFinanceStore } from '../stores/financeStore'

const store = useGoalsStore()
const financeStore = useFinanceStore()

const showCreateModal = ref(false)
const showUpdateModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)

const selectedGoal = ref(null)
const goalToDeleteId = ref(null)
const operationType = ref('deposit')

function handleCreate(data) {
  store.addGoal(data)
  showCreateModal.value = false
}

function openUpdateModal(payload) {
  selectedGoal.value = payload.goal
  operationType.value = payload.type
  showUpdateModal.value = true
}

function closeUpdateModal() {
  selectedGoal.value = null
  showUpdateModal.value = false
}

function handleUpdateBalance(amount) {
  if (!selectedGoal.value) return

  if (operationType.value === 'deposit') {
    store.deposit(selectedGoal.value.id, amount)
    
    financeStore.addTransaction({
      title: `Depósito Meta: ${selectedGoal.value.title}`,
      amount: amount,
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
      category: 'Outros' 
    })

  } else {
    store.withdraw(selectedGoal.value.id, amount)
    
    financeStore.addTransaction({
      title: `Resgate Meta: ${selectedGoal.value.title}`,
      amount: amount,
      type: 'income', 
      date: new Date().toISOString().split('T')[0],
      category: 'Outros'
    })
  }

  closeUpdateModal()
}

function openEditModal(goal) {
  selectedGoal.value = goal
  showEditModal.value = true
}

function closeEditModal() {
  selectedGoal.value = null
  showEditModal.value = false
}

function handleEdit(data) {
  if (selectedGoal.value) {
    store.editGoal(selectedGoal.value.id, data.title, data.target)
  }
  closeEditModal()
}

function requestDelete(id) {
  goalToDeleteId.value = id
  showDeleteModal.value = true
}

function confirmDelete() {
  if (goalToDeleteId.value) {
    const goal = store.goals.find(g => g.id === goalToDeleteId.value)
    
    if (goal && goal.current > 0) {
      financeStore.addTransaction({
        title: `Devolução Meta: ${goal.title}`,
        amount: goal.current,
        type: 'income',
        date: new Date().toISOString().split('T')[0],
        category: 'Outros'
      })
    }

    store.removeGoal(goalToDeleteId.value)
  }
  showDeleteModal.value = false
  goalToDeleteId.value = null
}
</script>

<style scoped>
.header-actions {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;
}

.title-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.header-actions h2 { color: #fff; margin: 0; }

.balance-display {
  font-size: 0.9rem;
  color: #94a3b8;
  display: flex;
  gap: 8px;
  align-items: center;
}

.balance-value {
  color: #4ade80;
  font-weight: bold;
  font-size: 1rem;
  background: rgba(74, 222, 128, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
}

.btn-add {
  background: #8b5cf6; color: white; border: none;
  padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;
  height: fit-content;
}
.btn-add:hover { background: #7c3aed; }

.empty-msg { color: #64748b; text-align: center; width: 100%; margin-top: 20px; }

.goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>