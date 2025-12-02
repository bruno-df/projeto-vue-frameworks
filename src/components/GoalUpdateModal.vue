<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>{{ mode === 'deposit' ? 'Adicionar a' : 'Retirar de' }}: {{ goalTitle }}</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <div class="balance-info" :class="{ 'error-bg': isInsufficientFunds }">
        <span>Saldo Disponível:</span>
        <strong :class="isInsufficientFunds ? 'text-error' : 'highlight'">
          R$ {{ financeStore.balance.toFixed(2) }}
        </strong>
      </div>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Valor (R$)</label>
          <input 
            v-model.number="amount" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            required 
            autofocus
            :class="{ 'input-error': isInsufficientFunds }"
          />
          <small v-if="isInsufficientFunds" class="error-msg">
            Saldo insuficiente para este depósito.
          </small>
        </div>

        <button 
          type="submit" 
          class="btn-primary"
          :class="{ 'btn-danger': mode === 'withdraw', 'btn-disabled': isInsufficientFunds }"
          :disabled="isInsufficientFunds"
        >
          {{ mode === 'deposit' ? 'Confirmar Depósito' : 'Confirmar Saque' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const props = defineProps({
  goalTitle: String,
  goalBalance: Number,
  mode: { type: String, default: 'deposit' }
})
const emit = defineEmits(['close', 'save'])

const financeStore = useFinanceStore()
const amount = ref(null)

const limitValue = computed(() => {
    if (props.mode === 'deposit') {
        return financeStore.balance
    } else {
        return props.goalBalance
    }
})

const isInsufficientFunds = computed(() => {
  if (!amount.value) return false
  return amount.value > limitValue.value
})

function submitForm() {
  if (!amount.value || amount.value <= 0) return
  if (isInsufficientFunds.value) return
  
  emit('save', amount.value)
  amount.value = null
}
</script>

<style scoped>
.balance-info {
  background: rgba(255, 255, 255, 0.03);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #94a3b8;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s;
}

.balance-info.error-bg {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.highlight { color: #4ade80; }
.text-error { color: #ef4444; }

.input-error {
  border-color: #ef4444 !important;
  color: #ef4444 !important;
}

.error-msg {
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
}

.btn-primary { transition: background 0.2s; }

.btn-danger {
  background-color: #ef4444 !important;
}
.btn-danger:hover {
  background-color: #dc2626 !important;
}

.btn-disabled {
  background-color: #475569 !important;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>