<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import AppCard from '../components/AppCard.vue';
import { useAuthStore } from '../stores/auth';

const apps = ref([]);
const search = ref('');
const selectedCategory = ref('All');
const categories = computed(() => ['All', ...new Set(apps.value.map(app => app.category))]);
const authStore = useAuthStore();

const fetchApps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/apps', { withCredentials: true });
    apps.value = response.data;
  } catch (error) {
    console.error('Failed to fetch apps:', error);
  }
};

const filteredApps = computed(() => {
  return apps.value.filter(app => {
    const matchesSearch = app.title.toLowerCase().includes(search.value.toLowerCase()) || 
                          app.description.toLowerCase().includes(search.value.toLowerCase());
    const matchesCategory = selectedCategory.value === 'All' || app.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

onMounted(fetchApps);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">A</div>
          <h1 class="text-2xl font-bold text-gray-800">App Directory</h1>
        </div>
        <div class="flex items-center gap-4">
          <router-link to="/profile" class="text-gray-600 hover:text-blue-600 font-medium transition-colors hidden sm:block">
            Welcome, {{ authStore.user?.family_name || 'User' }}
          </router-link>
          <router-link v-if="authStore.isAdmin" to="/admin" class="text-gray-600 hover:text-blue-600 font-medium transition-colors">Admin</router-link>
          <button @click="authStore.logout" class="text-gray-600 hover:text-red-600 font-medium transition-colors">Logout</button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Search and Filter -->
      <div class="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm">
        <div class="relative w-full sm:w-96">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="search"
            type="text" 
            placeholder="Search apps..." 
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div class="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button 
            v-for="category in categories" 
            :key="category"
            @click="selectedCategory = category"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              selectedCategory === category 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- App Grid -->
      <div v-if="filteredApps.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AppCard v-for="app in filteredApps" :key="app.id" :app="app" />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-20">
        <div class="text-gray-300 mb-4">
          <svg class="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">No apps found</h3>
        <p class="text-gray-500">Try adjusting your search or filters.</p>
      </div>
    </main>
  </div>
</template>
