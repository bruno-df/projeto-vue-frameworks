<template>
  <div class="layout-container">
    <aside class="sidebar">
      <div class="logo">
        <router-link to="/" class="logo-link">
        <img :src="logoImg" alt="logo">
        </router-link>
      </div>
      <nav>
        <router-link to="/" active-class="active">Dashboard</router-link>
        <router-link to="/investimentos" active-class="active">Investimentos</router-link>
        <router-link to="/metas" active-class="active">Metas</router-link>
        <router-link to="/relatorios" active-class="active">Relatórios</router-link>
      </nav>
      <div class="logout-area">
        <button @click="handleLogout">Sair</button>
      </div>
    </aside>

    <div class="main-content">
      <header class="top-bar">
        <h1>{{ currentPageTitle }}</h1>
        <div class="user-info">Olá, Utilizador</div>
      </header>
      
      <main class="content-area">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import logoImg from '@/assets/icone_logo_fintech_vue.png'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const currentPageTitle = computed(() => route.name)

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: #0f172a; /* Fundo global Dark */
  color: #fff;
}

/* Sidebar */
.sidebar {
  width: 250px;
  background: #161321;
  border-right: 1px solid #2d2a3d;
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.logo h2 { margin-bottom: 40px; color: white; }
.logo .neon { color: #a855f7; }

nav { flex: 1; display: flex; flex-direction: column; gap: 10px; }
nav a {
  padding: 12px;
  text-decoration: none;
  color: #94a3b8;
  border-radius: 8px;
  transition: all 0.3s;
}
nav a:hover { background: rgba(168, 85, 247, 0.1); color: #d8b4fe; }
nav a.active {
  background: linear-gradient(90deg, rgba(139, 92, 246, 0.2), transparent);
  border-left: 3px solid #8b5cf6;
  color: #fff;
}

.logout-area button {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 8px;
  cursor: pointer;
}
.logout-area button:hover { background: #ef4444; color: white; }

/* Main Content */
.main-content { flex: 1; display: flex; flex-direction: column; }
.top-bar {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #1e293b;
  background: #0f172a;
}
.content-area { padding: 30px; overflow-y: auto; }

/* CSS Atualizado para a Logo */
.logo {
  margin-bottom: 40px;
  text-align: center; /* Centraliza se a imagem for pequena */
}

.logo-link {
  display: inline-block; /* Garante que o link envolva a imagem corretamente */
  cursor: pointer;       /* Força o cursor de "mãozinha" */
  transition: transform 0.2s ease;
}

.logo-link:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.logo img {
  max-width: 100%; /* Garante que a imagem não estoure a sidebar */
  height: auto;
  display: block; /* Remove espaços fantasmas abaixo da imagem */
}
</style>