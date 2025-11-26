import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: true,
    }),
    getters: {
        isAdmin: (state) => {
            if (!state.user) return false;

            console.log('Checking admin status for user:', state.user);

            // Check various possible role fields from different OIDC providers
            const roles = state.user.roles || state.user.role || state.user.groups || [];
            const realmRoles = state.user.realm_access?.roles || [];
            const allRoles = [...(Array.isArray(roles) ? roles : [roles]), ...realmRoles];

            const hasAdminRole = allRoles.some(r =>
                typeof r === 'string' && r.toLowerCase().includes('admin')
            );

            // Fallback: check if user email is in admin list (configure via env)
            const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
            const isAdminEmail = adminEmails.some(email =>
                email.trim().toLowerCase() === state.user.email?.toLowerCase()
            );

            const result = hasAdminRole || isAdminEmail;
            console.log('Admin check result:', { hasAdminRole, isAdminEmail, result });

            return result;
        }
    },
    actions: {
        async fetchUser() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, { withCredentials: true });
                console.log('User Data:', response.data.user);
                this.user = response.data.user;
            } catch (error) {
                this.user = null;
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`;
        },
        login() {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/login`;
        }
    },
});
