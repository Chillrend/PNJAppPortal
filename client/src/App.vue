<script setup>
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
  authStore.fetchUser();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 font-sans">
    <router-view />
  </div>
</template>
