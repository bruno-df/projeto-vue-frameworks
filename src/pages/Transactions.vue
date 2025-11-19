<template>
<DefaultLayout>
<h1>Transações</h1>
<div class="list">
<TransactionItem
v-for="t in store.transactions"
:key="t.id"
:item="t"
/>
</div>
</DefaultLayout>
</template>


<script setup>
import TransactionItem from '../components/TransactionItem.vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useFinanceStore } from '../stores/finance'
const store = useFinanceStore()
</script>


<style scoped>
.list {
margin-top: 1rem;
display: flex;
flex-direction: column;
gap: .7rem;
}
</style>