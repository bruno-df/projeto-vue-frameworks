import { defineStore } from 'pinia'

export const useFinanceStore = defineStore('finance', {
  state: () => ({
    balance: 2350.00,
    // Histórico real
    transactions: [
      { id: 1, title: 'Projeto Freelance', amount: 2500, type: 'income', date: '2023-10-01', category: 'Trabalho' },
      { id: 2, title: 'Servidor Cloud', amount: 150, type: 'expense', date: '2023-10-05', category: 'Trabalho' }
    ],
    // Contas a Pagar (Futuro)
    scheduledTransactions: [
      { id: 101, title: 'Aluguel', amount: 1200, date: '2025-12-10', category: 'Casa' },
      { id: 102, title: 'Internet Fibra', amount: 100, date: '2025-12-15', category: 'Casa' }
    ]
  }),
  getters: {
    totalIncome: (state) => state.transactions
      .filter(t => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0),
    totalExpense: (state) => state.transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0),
    // Soma do que temos para pagar
    totalScheduled: (state) => state.scheduledTransactions
      .reduce((acc, curr) => acc + curr.amount, 0)
  },
  actions: {
    addTransaction(transaction) {
      this.transactions.push({ ...transaction, id: Date.now() })
      // Atualiza saldo
      if (transaction.type === 'income') this.balance += transaction.amount
      else this.balance -= transaction.amount
    },
    removeTransaction(id) {
      const index = this.transactions.findIndex(t => t.id === id)
      if (index !== -1) {
        const t = this.transactions[index]
        // Reverte o saldo ao apagar
        if (t.type === 'income') this.balance -= t.amount
        else this.balance += t.amount
        this.transactions.splice(index, 1)
      }
    },

    addScheduled(bill) {
      this.scheduledTransactions.push({ ...bill, id: Date.now() })
    },
    removeScheduled(id) {
      this.scheduledTransactions = this.scheduledTransactions.filter(t => t.id !== id)
    },
    payScheduled(id) {
      const index = this.scheduledTransactions.findIndex(t => t.id === id)
      if (index !== -1) {
        const bill = this.scheduledTransactions[index]
        
        // 1. Cria a transação real
        this.addTransaction({
          title: bill.title,
          amount: bill.amount,
          type: 'expense',
          date: new Date().toISOString().split('T')[0], // Data de hoje (pagamento)
          category: bill.category
        })

        // 2. Remove da lista de futuros
        this.scheduledTransactions.splice(index, 1)
      }
    }
  }
})