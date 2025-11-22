<template>
  <div class="finance-container">
    
    <div class="filters-bar">
      
      <div class="filter-group search">
        <input 
          v-model="filters.query" 
          type="text" 
          placeholder="🔍 Buscar..." 
        />
      </div>

      <div class="filter-group">
        <select v-model="filters.type">
          <option value="all">Todos</option>
          <option value="income">Entradas</option>
          <option value="expense">Saídas</option>
        </select>
      </div>

      <div class="filter-group">
        <select v-model="filters.sort">
          <option value="date-desc">Recentes</option>
          <option value="date-asc">Antigos</option>
          <option value="amount-desc">Maior Valor</option>
          <option value="amount-asc">Menor Valor</option>
        </select>
      </div>

      <div class="filter-group dates">
        <input type="date" v-model="filters.startDate" />
        <span class="separator">até</span>
        <input type="date" v-model="filters.endDate" />
      </div>
    </div>

    <div class="grid-list">
      <div v-if="filteredTransactions.length === 0" class="no-results">
        Nenhuma transação encontrada.
      </div>

      <div 
        v-for="item in filteredTransactions" 
        :key="item.id" 
        class="grid-item"
      >
        <div class="info">
          <span class="title">{{ item.title }}</span>
          <span class="date">{{ formatDate(item.date) }}</span>
        </div>
        
        <div class="actions-right">
          <div class="amount" :class="item.type">
            {{ item.type === 'income' ? '+' : '-' }} R$ {{ item.amount.toFixed(2) }}
          </div>
          <button @click="store.removeTransaction(item.id)" class="btn-delete" title="Apagar">
            🗑️
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useFinanceStore } from '../stores/financeStore'

const store = useFinanceStore()

const filters = reactive({
  query: '',
  type: 'all',
  sort: 'date-desc',
  startDate: '',
  endDate: ''
})

function formatDate(dateString) {
  if (!dateString) return ''
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

const filteredTransactions = computed(() => {
  let result = [...store.transactions]

  if (filters.query) {
    const term = filters.query.toLowerCase()
    result = result.filter(t => t.title.toLowerCase().includes(term))
  }

  if (filters.type !== 'all') {
    result = result.filter(t => t.type === filters.type)
  }

  if (filters.startDate) {
    result = result.filter(t => t.date >= filters.startDate)
  }

  if (filters.endDate) {
    result = result.filter(t => t.date <= filters.endDate)
  }

  result.sort((a, b) => {
    if (filters.sort === 'date-desc') {
      return new Date(b.date) - new Date(a.date)
    } else if (filters.sort === 'date-asc') {
      return new Date(a.date) - new Date(b.date)
    } else if (filters.sort === 'amount-desc') {
      return b.amount - a.amount
    } else if (filters.sort === 'amount-asc') {
      return a.amount - b.amount
    }
    return 0
  })

  return result
})
</script>

<style scoped>
.finance-container {
  background: var(--color-card, #1e1b2e);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(139, 92, 246, 0.1);
}

.filters-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  align-items: center;
}

.filter-group {
  flex: 1;
  min-width: 100px;
}

.filter-group.search {
  flex: 1.5;
  min-width: 120px;
}

.filter-group.dates {
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 2;
  min-width: 230px;
}

input, select {
  width: 100%;
  padding: 8px 10px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 0.85rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #8b5cf6;
}

input[type="date"] {
  color-scheme: dark;
  max-width: 130px; 
}

.separator {
  color: #64748b;
  font-size: 0.8rem;
  white-space: nowrap;
}

.grid-list { display: flex; flex-direction: column; gap: 10px; }

.grid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  border-left: 3px solid transparent;
  transition: background 0.2s;
}
.grid-item:hover { background: rgba(139, 92, 246, 0.05); }

.amount.income { color: #4ade80; border-left-color: #4ade80; }
.amount.expense { color: #f87171; border-left-color: #f87171; }

.info { display: flex; flex-direction: column; }
.title { color: #fff; font-weight: 500; }
.date { font-size: 0.8rem; color: #64748b; margin-top: 2px; }

.actions-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-delete {
  background: transparent; border: none; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; font-size: 1.1rem;
}
.btn-delete:hover { opacity: 1; }

.no-results {
  text-align: center; padding: 30px; color: #64748b; font-style: italic;
}

@media (max-width: 850px) {
  .filters-bar {
    gap: 10px;
  }
  .filter-group.search {
    min-width: 100%;
    order: -1;
  }
  .filter-group.dates {
    min-width: 100%;
  }
  input[type="date"] {
    max-width: 100%;
  }
}
</style>