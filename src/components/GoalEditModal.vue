<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window" @click.stop>
      <header>
        <h3>Editar Meta</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label>Nome da Meta</label>
          <input v-model="form.title" type="text" required />
        </div>

        <div class="form-group">
          <label>Valor Alvo (Meta Final)</label>
          <input v-model.number="form.target" type="number" step="0.01" required />
        </div>

        <button type="submit" class="btn-primary">Salvar Alterações</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'

const props = defineProps(['goalData'])
const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  target: null
})

onMounted(() => {
  if (props.goalData) {
    form.title = props.goalData.title
    form.target = props.goalData.target
  }
})

function submitForm() {
  if (!form.title || !form.target) return
  emit('save', { title: form.title, target: form.target })
}
</script>

<style scoped>
</style>