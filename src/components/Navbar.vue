<template>
<nav class="navbar">
<h2>Finanças</h2>
<button @click="logout">Sair</button>
</nav>
</template>


<script setup>
import { useUserStore } from '../stores/user'
const user = useUserStore()
const logout = () => user.logout()
</script>


<style scoped>
.navbar {
height: 70px;
background: #1a1f36;
color: white;
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 1.5rem;
box-shadow: 0 2px 4px rgba(0,0,0,0.15);
}
button {
background: #ff5252;
border: none;
padding: 8px 14px;
color: white;
cursor: pointer;
border-radius: 6px;
}
</style>