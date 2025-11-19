<template>
<DefaultLayout>
<h1>Visão Geral</h1>
<div class="cards">
<FinanceCard title="Saldo Atual" :value="store.balance" />
<FinanceCard title="Receitas" :value="store.incomeTotal" />
<FinanceCard title="Despesas" :value="store.expenseTotal" />
</div>
</DefaultLayout>
</template>


<script setup>
import DefaultLayout from '../layouts/DefaultLayout.vue'
import FinanceCard from '../components/FinanceCard.vue'
import { useFinanceStore } from '../stores/finance'
const store = useFinanceStore()
</script>


<style scoped>
.cards {
display: flex;
gap: 1rem;
margin-top: 1rem;
}
</style>