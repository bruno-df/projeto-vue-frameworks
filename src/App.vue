<template>
  <MainLayout v-if="layout === 'main'">
    <RouterView />
  </MainLayout>

  <div v-else>
    <RouterView />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'

const route = useRoute()
const layout = computed(() => route.meta.layout || 'empty')
</script>

<style>
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
body { background-color: #0f172a; color: #fff; }
</style>