import { defineStore } from 'pinia'

export const useGoalsStore = defineStore('goals', {
  state: () => ({
    goals: [
      { id: 1, title: 'Reserva de Emergência', current: 5000, target: 15000 },
      { id: 2, title: 'Viagem Japão', current: 2000, target: 20000 },
      { id: 3, title: 'MacBook Pro', current: 12000, target: 14000 }
    ]
  }),
  actions: {
    addGoal(goal) {
      this.goals.push({ ...goal, id: Date.now() })
    }
  }
})