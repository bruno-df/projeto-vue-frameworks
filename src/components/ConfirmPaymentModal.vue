<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window small-modal" @click.stop>
      <header>
        <h3>Confirmar Pagamento</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <div class="content">
        <p>Deseja efetivar o pagamento de:</p>
        <h4 class="bill-title">{{ billTitle }}</h4>
        <div class="amount-display">
          R$ {{ billAmount.toFixed(2) }}
        </div>
        <p class="sub-text">O valor será descontado do seu saldo atual.</p>
      </div>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
        <button class="btn-confirm-pay" @click="$emit('confirm')">✅ Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  billTitle: String,
  billAmount: Number
})
defineEmits(['close', 'confirm'])
</script>

<style scoped>
.small-modal {
  max-width: 350px;
  border: 1px solid #4ade80; /* Borda Verde para indicar sucesso/pagamento */
  box-shadow: 0 10px 30px rgba(74, 222, 128, 0.15);
}

header h3 { color: #4ade80; margin: 0; font-size: 1.1rem; }
.close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }

.content { margin: 25px 0; text-align: center; }
.content p { color: #cbd5e1; margin-bottom: 5px; font-size: 0.9rem; }

.bill-title {
  color: white;
  font-size: 1.2rem;
  margin: 10px 0 5px 0;
}

.amount-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4ade80;
  margin-bottom: 15px;
  background: rgba(74, 222, 128, 0.1);
  display: inline-block;
  padding: 5px 15px;
  border-radius: 8px;
}

.sub-text { font-size: 0.8rem; color: #64748b; }

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #334155;
  color: #94a3b8;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}
.btn-cancel:hover { border-color: white; color: white; }

.btn-confirm-pay {
  background: #4ade80;
  color: #064e3b;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;
}
.btn-confirm-pay:hover { transform: scale(1.05); background: #22c55e; }
</style>