<template>
  <div class="future-view">
    
    <div class="header-actions">
      <div class="title-group">
        <h2>Contas a Pagar</h2>
        <div class="total-display">
          <span>Total Previsto:</span>
          <span class="total-value">R$ {{ store.totalScheduled.toFixed(2) }}</span>
        </div>
      </div>
      <button class="btn-add" @click="showAddModal = true">+ Agendar Conta</button>
    </div>

    <div class="bills-grid">
      <div v-if="store.scheduledTransactions.length === 0" class="empty-msg">
        Nenhuma conta pendente. Você está em dia! 🎉
      </div>

      <div 
        v-for="bill in store.scheduledTransactions" 
        :key="bill.id" 
        class="bill-card"
        :class="{ 'overdue': isOverdue(bill.date) }"
      >
        <div class="bill-left">
          <div class="date-box">
            <span class="day">{{ getDay(bill.date) }}</span>
            <span class="month">{{ getMonth(bill.date) }}</span>
          </div>
          <div class="info">
            <h3>{{ bill.title }}</h3>
            <span class="category">{{ bill.category }}</span>
            <span v-if="isOverdue(bill.date)" class="badge-late">Vencido</span>
          </div>
        </div>

        <div class="bill-right">
          <span class="amount">R$ {{ bill.amount.toFixed(2) }}</span>
          <div class="actions">
            <button class="btn-pay" @click="requestPay(bill)" title="Pagar Agora">
              ✅ Pagar
            </button>
            <button class="btn-del" @click="store.removeScheduled(bill.id)" title="Remover">
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>

    <AddBillModal 
      v-if="showAddModal"
      @close="showAddModal = false"
      @save="handleSave"
    />

    <ConfirmPaymentModal
      v-if="showPayModal"
      :billTitle="billToPay?.title"
      :billAmount="billToPay?.amount"
      @close="showPayModal = false"
      @confirm="confirmPayment"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddBillModal from '../components/AddBillModal.vue'
import ConfirmPaymentModal from '../components/ConfirmPaymentModal.vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()
const showAddModal = ref(false)
const showPayModal = ref(false)
const billToPay = ref(null)

function handleSave(data) {
  store.addScheduled(data)
  showAddModal.value = false
}

// Abre o modal em vez do confirm() nativo
function requestPay(bill) {
  billToPay.value = bill
  showPayModal.value = true
}

// Executa o pagamento real ao confirmar no modal
function confirmPayment() {
  if (billToPay.value) {
    store.payScheduled(billToPay.value.id)
  }
  showPayModal.value = false
  billToPay.value = null
}

function isOverdue(dateString) {
  const today = new Date().toISOString().split('T')[0]
  return dateString < today
}

function getDay(dateString) {
  return dateString.split('-')[2]
}

function getMonth(dateString) {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
  return months[parseInt(dateString.split('-')[1]) - 1]
}
</script>

<style scoped>
.header-actions { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.title-group { display: flex; flex-direction: column; gap: 5px; }
.header-actions h2 { color: #fff; margin: 0; }

.total-display { font-size: 0.9rem; color: #94a3b8; display: flex; gap: 8px; align-items: center; }
.total-value { color: #f87171; font-weight: bold; font-size: 1rem; background: rgba(248, 113, 113, 0.1); padding: 2px 8px; border-radius: 6px; }

.btn-add { background: #8b5cf6; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.btn-add:hover { background: #7c3aed; }
.empty-msg { color: #64748b; text-align: center; margin-top: 40px; }

.bills-grid { display: flex; flex-direction: column; gap: 15px; }

.bill-card {
  display: flex; justify-content: space-between; align-items: center;
  background: var(--color-card, #1e1b2e);
  padding: 15px 20px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);
  transition: all 0.2s;
}
.bill-card:hover { transform: translateX(5px); border-color: #8b5cf6; }

.bill-card.overdue { border-color: #ef4444; background: rgba(239, 68, 68, 0.05); }
.badge-late { background: #ef4444; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; margin-left: 8px; text-transform: uppercase; font-weight: bold; }

.bill-left { display: flex; gap: 15px; align-items: center; }

.date-box {
  background: #0f172a; width: 50px; height: 50px; border-radius: 8px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  border: 1px solid #334155;
}
.date-box .day { font-size: 1.1rem; font-weight: bold; color: white; line-height: 1; }
.date-box .month { font-size: 0.7rem; color: #94a3b8; text-transform: uppercase; }

.info h3 { margin: 0; font-size: 1rem; color: white; }
.info .category { font-size: 0.85rem; color: #94a3b8; }

.bill-right { display: flex; align-items: center; gap: 20px; }
.amount { font-size: 1.1rem; font-weight: bold; color: #fff; }

.actions { display: flex; gap: 10px; }

.btn-pay {
  background: rgba(74, 222, 128, 0.1); color: #4ade80; border: 1px solid #4ade80;
  padding: 6px 12px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;
  transition: all 0.2s;
}
.btn-pay:hover { background: #4ade80; color: #0f172a; }

.btn-del { background: transparent; border: none; cursor: pointer; opacity: 0.6; font-size: 1.1rem; }
.btn-del:hover { opacity: 1; }

@media (max-width: 600px) {
  .bill-card { flex-direction: column; align-items: flex-start; gap: 15px; }
  .bill-right { width: 100%; justify-content: space-between; }
}
</style>