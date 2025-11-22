<template>
  <div class="connections-view">
    <div class="header-actions">
      <h2>Minhas Conexões (Open Finance)</h2>
      <button class="btn-primary-outline" @click="showModal = true">+ Conectar Novo Banco</button>
    </div>

    <div class="banks-grid">
      <div v-for="bank in banks" :key="bank.id" class="bank-card">
        <div class="bank-header">
          <div class="bank-icon" :style="{ background: bank.color }">
            {{ bank.initials }}
          </div>
          <div class="bank-info">
            <h3>{{ bank.name }}</h3>
            <span class="account-type">{{ bank.type }}</span>
          </div>
          <div class="status-badge" :class="{ active: bank.connected }">
            {{ bank.connected ? 'Ativo' : 'Desconectado' }}
          </div>
        </div>

        <div class="bank-body">
          <p>Última sincronização: <span>{{ bank.lastSync }}</span></p>
          <p>Saldo importado: <strong>R$ {{ bank.balance.toFixed(2) }}</strong></p>
        </div>

        <div class="bank-footer">
          <button class="btn-sync" @click="simulateSync(bank.id)">
            🔄 Sincronizar
          </button>
          <button class="btn-danger-text" @click="removeBank(bank.id)">Desconectar</button>
        </div>
      </div>

      <div class="bank-card add-new" @click="showModal = true">
        <div class="add-content">
          <span class="plus-icon">+</span>
          <h3>Adicionar Instituição</h3>
          <p>Importe dados automaticamente</p>
        </div>
      </div>
    </div>

    <BankConnectionModal 
      v-if="showModal" 
      @close="showModal = false" 
      @save="handleAddBank"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BankConnectionModal from '../components/BankConnectionModal.vue'

const showModal = ref(false)

const banks = ref([
  { 
    id: 1, 
    name: 'Nubank', 
    type: 'Conta Corrente', 
    initials: 'Nu', 
    color: '#820ad1', 
    connected: true, 
    lastSync: 'Hoje, 10:30', 
    balance: 1250.50 
  },
  { 
    id: 2, 
    name: 'Inter', 
    type: 'Investimentos', 
    initials: 'In', 
    color: '#ff7a00', 
    connected: true, 
    lastSync: 'Ontem, 18:00', 
    balance: 5400.00 
  }
])

function simulateSync(id) {
  const bank = banks.value.find(b => b.id === id)
  if (bank) {
    const originalText = bank.lastSync
    bank.lastSync = 'Sincronizando...'
    setTimeout(() => {
      bank.lastSync = 'Agora mesmo'
      bank.balance += 10 
    }, 1500)
  }
}

function handleAddBank(data) {
  banks.value.push({
    id: Date.now(),
    name: data.name,
    initials: data.initials,
    color: data.color,
    type: data.type,
    balance: data.balance,
    connected: true,
    lastSync: 'Agora mesmo'
  })
  showModal.value = false
}

function removeBank(id) {
  if(confirm('Deseja desconectar este banco?')) {
    banks.value = banks.value.filter(b => b.id !== id)
  }
}
</script>

<style scoped>
.header-actions {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;
}
.header-actions h2 { color: white; margin: 0; }

.btn-primary-outline {
  background: transparent; border: 1px solid #8b5cf6; color: #8b5cf6;
  padding: 10px 20px; border-radius: 8px; cursor: pointer; transition: all 0.2s;
}
.btn-primary-outline:hover { background: #8b5cf6; color: white; }

.banks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.bank-card {
  background: var(--color-card, #1e1b2e);
  border: 1px solid rgba(139, 92, 246, 0.1);
  border-radius: 16px;
  padding: 20px;
  transition: transform 0.2s;
}
.bank-card:hover { border-color: #8b5cf6; transform: translateY(-3px); }

.bank-header { display: flex; align-items: center; gap: 15px; margin-bottom: 20px; }

.bank-icon {
  width: 45px; height: 45px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  font-weight: bold; color: white; font-size: 1.1rem;
}

.bank-info h3 { margin: 0; font-size: 1rem; color: white; }
.account-type { font-size: 0.8rem; color: #94a3b8; }

.status-badge {
  margin-left: auto; font-size: 0.7rem; padding: 4px 8px; border-radius: 20px;
  background: #334155; color: #94a3b8;
}
.status-badge.active { background: rgba(74, 222, 128, 0.1); color: #4ade80; }

.bank-body { margin-bottom: 20px; }
.bank-body p { margin: 5px 0; color: #94a3b8; font-size: 0.9rem; }
.bank-body strong { color: white; font-size: 1.1rem; }
.bank-body span { color: #d8b4fe; }

.bank-footer {
  display: flex; justify-content: space-between; align-items: center;
  border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px;
}

.btn-sync {
  background: #334155; color: white; border: none; padding: 6px 12px;
  border-radius: 6px; cursor: pointer; font-size: 0.85rem;
  transition: background 0.2s;
}
.btn-sync:hover { background: #8b5cf6; }

.btn-danger-text {
  background: none; border: none; color: #ef4444; cursor: pointer; font-size: 0.85rem;
}
.btn-danger-text:hover { text-decoration: underline; }

.bank-card.add-new {
  border: 2px dashed #334155;
  display: flex; align-items: center; justify-content: center;
  background: transparent; cursor: pointer;
}
.bank-card.add-new:hover { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.05); }

.add-content { text-align: center; color: #94a3b8; }
.plus-icon { font-size: 2rem; display: block; margin-bottom: 10px; color: #8b5cf6; }
</style>