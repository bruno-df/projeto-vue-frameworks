import { defineStore } from 'pinia'

export const useInvestmentsStore = defineStore('investments', {
  state: () => ({
    investments: [
      { id: 1, name: 'Bitcoin', value: 20000, yield: '+5.2%' },
      { id: 2, name: 'Tesla Stocks', value: 10000, yield: '-1.2%' },
      { id: 3, name: 'Tesouro Direto', value: 5000, yield: '+0.8%' }
    ]
  }),
  actions: {
    addInvestment(item) {
      this.investments.push({ ...item, id: Date.now() })
    },
    invest(id, amount) {
      const asset = this.investments.find(i => i.id === id)
      if (asset) asset.value += amount
    },
    redeem(id, amount) {
      const asset = this.investments.find(i => i.id === id)
      if (asset) {
        asset.value -= amount
        if (asset.value < 0) asset.value = 0
      }
    },
    editInvestment(id, name, yieldVal) {
      const asset = this.investments.find(i => i.id === id)
      if (asset) {
        asset.name = name
        asset.yield = yieldVal
      }
    },
    removeInvestment(id) {
      this.investments = this.investments.filter(i => i.id !== id)
    }
  }
})