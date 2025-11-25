<script setup>
defineProps({
  app: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
    <div class="p-6 flex flex-col h-full">
      <div class="flex items-center justify-between mb-4">
        <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img v-if="app.logo" :src="app.logo" :alt="app.title" class="w-full h-full object-cover" />
          <span v-else class="text-2xl font-bold text-gray-400">{{ app.title.charAt(0) }}</span>
        </div>
        <span class="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">{{ app.category }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{{ app.title }}</h3>
      <p class="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">{{ app.description }}</p>
      
      <a 
        :href="app.url" 
        target="_blank" 
        class="mt-auto w-full bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-center flex items-center justify-center gap-2"
      >
        Launch
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>
