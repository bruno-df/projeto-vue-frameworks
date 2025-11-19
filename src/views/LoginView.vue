<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Acessar Fin<span class="neon">Tech</span></h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const store = useUserStore()
const router = useRouter()

function handleLogin() {
  if (store.login(email.value, password.value)) {
    router.push('/')
  } else {
    alert('Preencha os campos!')
  }
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
}
.login-box {
  background: #1e1b2e;
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  border: 1px solid #2d2a3d;
}
h2 { color: white; margin-bottom: 30px; }
.neon { color: #a855f7; }
input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  color: white;
}
input:focus { outline: none; border-color: #8b5cf6; }
button {
  width: 100%;
  padding: 12px;
  background: #8b5cf6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}
button:hover { background: #7c3aed; }
</style>