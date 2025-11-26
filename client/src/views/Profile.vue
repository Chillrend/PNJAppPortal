<script setup>
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const userInitials = computed(() => {
  if (!user.value?.name) return 'U';
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow-xl rounded-2xl overflow-hidden">
        <!-- Header Background -->
        <div class="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        
        <!-- Profile Content -->
        <div class="relative px-8 pb-8">
          <!-- Avatar -->
          <div class="absolute -top-16 left-8">
            <div class="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center text-4xl font-bold text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100">
              {{ userInitials }}
            </div>
          </div>

          <!-- Header Info -->
          <div class="pt-20 mb-8">
            <h1 class="text-3xl font-bold text-gray-900">{{ user?.name }}</h1>
            <div class="flex items-center gap-2 text-gray-500 font-medium">
              <p>{{ user?.email }}</p>
              <span v-if="user?.email_verified" class="text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Verified
              </span>
            </div>
            <div class="mt-4 flex flex-wrap gap-2">
              <span v-for="role in user?.role" :key="role" class="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {{ role }}
              </span>
            </div>
          </div>

          <!-- Details Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-100 pt-8">
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-500">Username</label>
              <p class="text-gray-900 font-medium">{{ user?.preferred_username }}</p>
            </div>
            
            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-500">Given Name</label>
              <p class="text-gray-900 font-medium">{{ user?.given_name }}</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-500">Family Name</label>
              <p class="text-gray-900 font-medium">{{ user?.family_name }}</p>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-gray-500">Departments</label>
              <div class="flex flex-col gap-1">
                <span v-for="dept in user?.dept" :key="dept" class="text-gray-900">
                  {{ dept }}
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-8 pt-8 border-t border-gray-100 flex justify-end gap-4">
            <router-link to="/" class="px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-medium transition-colors">
              Back to Home
            </router-link>
            <button @click="authStore.logout" class="px-6 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
