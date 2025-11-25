<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();

const handleLogin = () => {
  authStore.login();
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center transform transition-all hover:scale-105 duration-300">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-2">Welcome</h1>
      <p class="text-gray-500 mb-8">Sign in to access your apps</p>
      
      <button 
        @click="handleLogin"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        Sign in with SSO
      </button>
    </div>
  </div>
</template>
