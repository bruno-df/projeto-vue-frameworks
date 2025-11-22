import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),
  actions: {
    login(email, password) {
      // Simulação de Login, qq email e senha funciona
      if (email && password) {
        this.user = { name: 'Utilizador Premium', email }
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})