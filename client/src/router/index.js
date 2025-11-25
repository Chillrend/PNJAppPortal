import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Admin from '../views/Admin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
            name: 'Admin',
            component: Admin,
            meta: { requiresAuth: true } // In real app, check for admin role
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.loading) {
        await authStore.fetchUser();
    }

    if (to.meta.requiresAuth && !authStore.user) {
        next('/login');
    } else if (to.path === '/login' && authStore.user) {
        next('/');
    } else {
        next();
    }
});

export default router;
