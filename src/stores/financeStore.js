import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    // Tenta carregar do LocalStorage, se não existir, usa o array vazio ou dados iniciais
    transactions: JSON.parse(localStorage.getItem('finance_data')) || [
      { id: 1, title: 'Exemplo Inicial', amount: 100, type: 'income', date: '2023-01-01' },
      { id: 2, title: 'Despesa', amount: 50, type: 'expense', date: '2023-02-02' }
    ]
  }),

  getters: {
    totalIncome: (state) => state.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0),
    totalExpense: (state) => state.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0),
    balance: (state) => {
      return state.transactions.reduce((acc, curr) => {
        return curr.type === 'income' ? acc + curr.amount : acc - curr.amount
      }, 0)
    }
  },

  actions: {
    addTransaction(transaction) {
      this.transactions.push({ ...transaction, id: Date.now() })
      this.saveToLocalStorage()
    },
    removeTransaction(id) {
      this.transactions = this.transactions.filter(t => t.id !== id)
      this.saveToLocalStorage()
    },
    // Função auxiliar para salvar
    saveToLocalStorage() {
      localStorage.setItem('finance_data', JSON.stringify(this.transactions))
    }
  }
})