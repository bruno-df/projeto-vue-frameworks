<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Nova Meta Financeira</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Objetivo</label>
          <input v-model="form.title" type="text" placeholder="Ex: Viagem, Carro Novo..." required />
        </div>

        <div class="form-group">
          <label>Valor Já Guardado (R$)</label>
          <input v-model.number="form.current" type="number" step="0.01" placeholder="0.00" />
        </div>

        <div class="form-group">
          <label>Valor Alvo (Meta Final) (R$)</label>
          <input v-model.number="form.target" type="number" step="0.01" placeholder="0.00" required />
        </div>

        <button type="submit" class="btn-primary">Criar Meta</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  current: 0,
  target: null
})

function submitForm() {
  if (!form.title || !form.target) return
  emit('save', { ...form })
  form.title = ''
  form.current = 0
  form.target = null
}
</script>