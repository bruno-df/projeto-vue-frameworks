import { defineStore } from 'pinia'

export const useInvestmentsStore = defineStore('investments', {
  state: () => ({
    investments: [
      { id: 1, name: 'Bitcoin', value: 45000, yield: '+5.2%' },
      { id: 2, name: 'Tesla Stocks', value: 12000, yield: '-1.2%' },
      { id: 3, name: 'Tesouro Direto', value: 5000, yield: '+0.8%' }
    ]
  }),
  actions: {
    addInvestment(item) {
      this.investments.push({ ...item, id: Date.now() })
    }
  }
})