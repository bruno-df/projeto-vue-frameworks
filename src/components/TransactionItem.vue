<template>
<div class="item" :class="item.type">
<span>{{ item.title }}</span>
<strong>R$ {{ item.value.toFixed(2) }}</strong>
</div>
</template>


<script setup>
defineProps({ item: Object })
</script>


<style scoped>
.item {
padding: .9rem;
background: white;
border-radius: 10px;
display: flex;
justify-content: space-between;
box-shadow: 0 2px 4px rgba(0,0,0,.08);
}
.item.income strong {
color: green;
}
.item.expense strong {
color: red;
}
</style>