<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Nova Transação</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        
        <div class="form-group">
          <label>Descrição</label>
          <input v-model="form.title" type="text" placeholder="Ex: Salário, Mercado..." required />
        </div>

        <div class="form-group">
          <label>Valor (R$)</label>
          <input v-model.number="form.amount" type="number" step="0.01" placeholder="0.00" class="{ 'input-error': isInsufficientFunds }" required />
          <small v-if="isInsufficientFunds" style="color: red; display: block;">Saldo insuficiente (Você tem: RS{{ financeStore.balance }})</small>
        </div>

        <div class="form-group">
          <label>Data</label>
          <input v-model="form.date" type="date" required />
        </div>

        <div class="form-group">
          <label>Categoria</label>
          <div class="select-wrapper">
            <select v-model="form.category" required>
              <option value="Outros">Outros</option>
              <option value="Casa">Casa</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Educação">Educação</option>
              <option value="Lazer">Lazer</option>
              <option value="Saúde">Saúde</option>
              <option value="Transporte">Transporte</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Tipo</label>
          <div class="type-selector">
            <label :class="{ active: form.type === 'income' }" class="radio-label income">
              <input type="radio" value="income" v-model="form.type"> Entrada
            </label>
            <label :class="{ active: form.type === 'expense' }" class="radio-label expense">
              <input type="radio" value="expense" v-model="form.type"> Saída
            </label>
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="isInsufficientFunds" 
        :style="{ opacity: isInsufficientFunds ? '0.5' : '1', cursor: isInsufficientFunds ? 'not-allowed' : 'pointer'}">Adicionar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useFinanceStore } from '@/stores/financeStore'
import { computed } from 'vue'

const emit = defineEmits(['close', 'save'])
const financeStore = useFinanceStore()

const isInsufficientFunds = computed(() => {
    if(form.type === 'income') return false
    if(!form.type === 'income') return false

    return form.amount > financeStore.balance
})

const form = reactive({
  title: '',
  amount: null,
  date: new Date().toISOString().split('T')[0],
  category: 'Outros',
  type: 'expense'
})

function submitForm() {
  if (!form.title || !form.amount) return
  if (isInsufficientFunds.value) return
  emit('save', { ...form })
}
</script>

<style scoped>
.type-selector { display: flex; gap: 10px; }

.radio-label {
  flex: 1;
  text-align: center;
  padding: 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
}
.radio-label input { display: none; }

.radio-label.income.active {
  background: rgba(74, 222, 128, 0.2);
  border-color: #4ade80;
  color: #4ade80;
}
.radio-label.expense.active {
  background: rgba(248, 113, 113, 0.2);
  border-color: #f87171;
  color: #f87171;
}

.select-wrapper {
  position: relative;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 10px 12px;
  background-color: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.input-error { border-color: red; }

select:focus {
  outline: none;
  border-color: #8b5cf6;
}

option {
  background-color: #1e1b2e;
  color: white;
  padding: 10px;
}

input[type="date"] {
  color-scheme: dark;
}
</style>