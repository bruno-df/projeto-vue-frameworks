<template>
  <div class="modal-backdrop" @click="$emit('close')">
    <div class="modal-window small-modal" @click.stop>
      <header>
        <h3>Excluir Meta</h3>
        <button class="close-btn" @click="$emit('close')">✖</button>
      </header>

      <div class="content">
        <p>Tem certeza que deseja excluir esta meta permanentemente?</p>
        <p class="sub-text">O saldo atual da meta será enviado diretamente de volta à conta bancária</p>
      </div>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">Cancelar</button>
        <button class="btn-confirm-delete" @click="$emit('confirm')">Sim, Excluir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.small-modal {
  max-width: 350px;
  border: 1px solid #ef4444;
  box-shadow: 0 10px 30px rgba(239, 68, 68, 0.15);
}

header h3 { color: #ef4444; margin: 0; }

.content { margin: 20px 0; text-align: center; }
.content p { color: white; margin-bottom: 5px; }
.sub-text { font-size: 0.85rem; color: #94a3b8; }

.actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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

.btn-confirm-delete {
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-confirm-delete:hover { background: #dc2626; }
</style>