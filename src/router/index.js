import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

import DashboardView from '../views/DashboardView.vue'
import InvestimentosView from '../views/InvestimentosView.vue'
import MetasView from '../views/MetasView.vue'
import RelatoriosView from '../views/RelatoriosView.vue'
import LoginView from '../views/LoginView.vue'
import BankConnectionsView from '../views/BankConnectionsView.vue'
import FutureTransactionsView from '../views/FutureTransactionsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
            meta: { layout: 'empty' }
        },
        {
            path: '/',
            name: 'Dashboard',
            component: DashboardView,
            meta: { requiresAuth: true, layout: 'main' }
        },
        {
            path: '/investimentos',
            name: 'Investimentos',
            component: InvestimentosView,
            meta: { requiresAuth: true, layout: 'main' }
        },
        {
            path: '/metas',
            name: 'Metas',
            component: MetasView,
            meta: { requiresAuth: true, layout: 'main' }
        },
        {
            path: '/relatorios',
            name: 'Relatórios',
            component: RelatoriosView,
            meta: { requiresAuth: true, layout: 'main' }
        },
        {
            path: '/conexoes',
            name: 'Conexões Bancárias',
            component: BankConnectionsView,
            meta: { requiresAuth: true, layout: 'main' }
        },
        {
            path: '/futuro',
            name: 'Lançamentos Futuros',
            component: FutureTransactionsView,
            meta: { requiresAuth: true, layout: 'main' }
        },
    ]
})

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router