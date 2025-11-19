<template>
<div class="base-card">
<slot />
</div>
</template>


<style scoped>
.base-card {
background: var(--color-surface);
padding: 1.5rem;
border-radius: 18px;
box-shadow: 0 0 15px rgba(0,0,0,0.35);
border: 1px solid var(--color-border);
transition: 0.2s ease;
}


.base-card:hover {
border-color: var(--color-primary);
box-shadow: 0 0 20px rgba(123,47,247,0.25);
}
</style>