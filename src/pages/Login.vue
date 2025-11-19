<template>
<div class="login-container">
<div class="login-card">
<h2>Entrar</h2>
<input v-model="email" type="email" placeholder="Email" />
<input v-model="password" type="password" placeholder="Senha" />
<button @click="submit">Login</button>
<p v-if="error" class="error">Credenciais inválidas</p>
</div>
</div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'


const email = ref('')
const password = ref('')
const error = ref(false)


const router = useRouter()
const user = useUserStore()


const submit = () => {
const ok = user.login(email.value, password.value)
if (!ok) return (error.value = true)
router.push('/dashboard')
}
</script>


<style scoped>
.login-container {
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background: #e9ecf2;
}
.login-card {
width: 350px;
padding: 2rem;
background: white;
border-radius: 12px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
display: flex;
flex-direction: column;
gap: 1rem;
}
input {
padding: .8rem;
border-radius: 8px;
border: 1px solid #ccc;
}
button {
padding: .8rem;
background: #1a1f36;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
}
.error {
color: red;
font-size: .9rem;
}
</style>