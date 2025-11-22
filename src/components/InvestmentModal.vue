<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Novo Investimento</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Nome do Ativo</label>
          <input v-model="form.name" type="text" placeholder="Ex: Tesouro Direto, Bitcoin..." required />
        </div>

        <div class="form-group">
          <label>Valor Investido (R$)</label>
          <input v-model.number="form.value" type="number" step="0.01" placeholder="0.00" required />
        </div>

        <div class="form-group">
          <label>Rendimento / Variação</label>
          <input v-model="form.yield" type="text" placeholder="Ex: +12% a.a. ou -1.5%" required />
        </div>

        <button type="submit" class="btn-primary">Adicionar Ativo</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close', 'save'])

const form = reactive({
  name: '',
  value: null,
  yield: ''
})

function submitForm() {
  if (!form.name || !form.value) return
  emit('save', { ...form })
  form.name = ''
  form.value = null
  form.yield = ''
}
</script>