import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        loading: true,
    }),
    actions: {
        async fetchUser() {
            try {
                const response = await axios.get('http://localhost:3000/auth/me', { withCredentials: true });
                this.user = response.data.user;
            } catch (error) {
                this.user = null;
            } finally {
                this.loading = false;
            }
        },
        async logout() {
            window.location.href = 'http://localhost:3000/auth/logout';
        },
        login() {
            window.location.href = 'http://localhost:3000/auth/login';
        }
    },
});
