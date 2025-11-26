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
            meta: { requiresAuth: true, requiresAdmin: true }
        },
        {
            path: '/profile',
            name: 'Profile',
            component: () => import('../views/Profile.vue'),
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.loading) {
        await authStore.fetchUser();
    }

    console.log('Router navigation:', {
        to: to.path,
        requiresAuth: to.meta.requiresAuth,
        requiresAdmin: to.meta.requiresAdmin,
        user: authStore.user,
        isAdmin: authStore.isAdmin
    });

    if (to.meta.requiresAuth && !authStore.user) {
        console.log('Redirecting to /login - user not authenticated');
        next('/login');
    } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
        console.warn('Access denied to admin page - user is not an admin');
        alert('Access Denied: You do not have admin privileges. Please contact your administrator.');
        next('/');
    } else if (to.path === '/login' && authStore.user) {
        next('/');
    } else {
        next();
    }
});

export default router;
