<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Conectar Instituição</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        
        <div class="form-group">
          <label>Selecione o Banco</label>
          <div class="select-wrapper">
            <select v-model="selectedBankIndex" required>
              <option v-for="(b, index) in bankOptions" :key="index" :value="index">
                {{ b.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Tipo de Conta</label>
          <div class="select-wrapper">
            <select v-model="form.type" required>
              <option value="Conta Corrente">Conta Corrente</option>
              <option value="Poupança">Poupança</option>
              <option value="Investimentos">Investimentos</option>
              <option value="Cartão de Crédito">Cartão de Crédito</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Saldo Inicial (Simulado)</label>
          <input 
            v-model.number="form.balance" 
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            required 
          />
        </div>

        <button type="submit" class="btn-primary">Conectar Agora</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const emit = defineEmits(['close', 'save'])

const bankOptions = [
  { name: 'Banco do Brasil', initials: 'BB', color: '#facc15' },
  { name: 'Santander', initials: 'Sa', color: '#ef4444' },
  { name: 'Bradesco', initials: 'Br', color: '#dc2626' },
  { name: 'C6 Bank', initials: 'C6', color: '#1e293b' },
  { name: 'Caixa', initials: 'Cx', color: '#2563eb' },
  { name: 'BTG Pactual', initials: 'BT', color: '#1d4ed8' },
  { name: 'PicPay', initials: 'Pp', color: '#10b981' }
]

const selectedBankIndex = ref(0)

const form = reactive({
  type: 'Conta Corrente',
  balance: null
})

function submitForm() {
  if (form.balance === null) return

  const bankInfo = bankOptions[selectedBankIndex.value]
  
  emit('save', {
    name: bankInfo.name,
    initials: bankInfo.initials,
    color: bankInfo.color,
    type: form.type,
    balance: form.balance
  })
}
</script>

<style scoped>
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

select:focus {
  outline: none;
  border-color: #8b5cf6;
}

option {
  background-color: #1e1b2e;
  color: white;
  padding: 10px;
}
</style>