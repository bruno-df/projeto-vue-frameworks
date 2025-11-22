<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Agendar Conta</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Descrição da Conta</label>
          <input v-model="form.title" type="text" placeholder="Ex: Luz, Cartão..." required />
        </div>

        <div class="form-group">
          <label>Valor (R$)</label>
          <input v-model.number="form.amount" type="number" step="0.01" placeholder="0.00" required />
        </div>

        <div class="form-group">
          <label>Vencimento</label>
          <input v-model="form.date" type="date" required />
        </div>

        <div class="form-group">
          <label>Categoria</label>
          <div class="select-wrapper">
            <select v-model="form.category">
              <option value="Casa">Casa</option>
              <option value="Alimentação">Alimentação</option>
              <option value="Educação">Educação</option>
              <option value="Lazer">Lazer</option>
              <option value="Saúde">Saúde</option>
              <option value="Transporte">Transporte</option>
              <option value="Outros">Outros</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-primary">Agendar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  amount: null,
  date: '',
  category: 'Casa'
})

function submitForm() {
  if (!form.title || !form.amount || !form.date) return
  emit('save', { ...form })
}
</script>

<style scoped>
/* Reaproveitando estilos globais para select customizado */
.select-wrapper { position: relative; }
select {
  appearance: none; width: 100%; padding: 10px 12px; background: #0f172a;
  border: 1px solid #334155; border-radius: 8px; color: white; font-size: 1rem;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center; background-repeat: no-repeat; background-size: 1.5em; padding-right: 2.5rem;
}
input[type="date"] { color-scheme: dark; }
</style>