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
    },
    deposit(id, amount) {
      const goal = this.goals.find(g => g.id === id)
      if (goal) goal.current += amount
    },
    withdraw(id, amount) {
      const goal = this.goals.find(g => g.id === id)
      if (goal) {
        goal.current -= amount
        if (goal.current < 0) goal.current = 0
      }
    },
    editGoal(id, newTitle, newTarget) {
      const goal = this.goals.find(g => g.id === id)
      if (goal) {
        goal.title = newTitle
        goal.target = newTarget
      }
    },
    removeGoal(id) {
      this.goals = this.goals.filter(g => g.id !== id)
    }
  }
})