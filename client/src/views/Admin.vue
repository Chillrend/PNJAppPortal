<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppForm from '../components/AppForm.vue';

const apps = ref([]);
const showModal = ref(false);
const editingApp = ref(null);

const fetchApps = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/apps', { withCredentials: true });
    apps.value = response.data;
  } catch (error) {
    console.error('Failed to fetch apps:', error);
  }
};

const handleCreate = async (formData) => {
  try {
    await axios.post('http://localhost:3000/api/apps', formData, { withCredentials: true });
    await fetchApps();
    closeModal();
  } catch (error) {
    console.error('Failed to create app:', error);
    alert('Failed to create app');
  }
};

const handleUpdate = async (formData) => {
  try {
    await axios.put(`http://localhost:3000/api/apps/${editingApp.value.id}`, formData, { withCredentials: true });
    await fetchApps();
    closeModal();
  } catch (error) {
    console.error('Failed to update app:', error);
    alert('Failed to update app');
  }
};

const handleDelete = async (id) => {
  if (!confirm('Are you sure you want to delete this app?')) return;
  try {
    await axios.delete(`http://localhost:3000/api/apps/${id}`, { withCredentials: true });
    await fetchApps();
  } catch (error) {
    console.error('Failed to delete app:', error);
    alert('Failed to delete app');
  }
};

const openCreateModal = () => {
  console.log('Opening create modal...');
  editingApp.value = null;
  showModal.value = true;
  console.log('Modal state:', { showModal: showModal.value, editingApp: editingApp.value });
};

const openEditModal = (app) => {
  editingApp.value = app;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingApp.value = null;
};

onMounted(fetchApps);
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-6xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">App Management</h1>
          <p class="text-gray-500 mt-1">Manage the directory of available applications</p>
        </div>
        <div class="flex gap-4">
          <router-link to="/" class="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
            Back to Directory
          </router-link>
          <button 
            @click="openCreateModal"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New App
          </button>
        </div>
      </div>

      <!-- Apps Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="app in apps" :key="app.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <img v-if="app.logo" :src="app.logo" class="h-10 w-10 object-cover" />
                    <span v-else class="font-bold text-gray-400">{{ app.title.charAt(0) }}</span>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ app.title }}</div>
                    <div class="text-sm text-gray-500 truncate max-w-xs">{{ app.description }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ app.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <a :href="app.url" target="_blank" class="hover:text-blue-600">{{ app.url }}</a>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openEditModal(app)" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                <button @click="handleDelete(app.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
            <tr v-if="apps.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                No apps found. Click "Add New App" to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal" aria-hidden="true"></div>
        
        <!-- Centering trick -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <!-- Modal Content -->
        <div class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full z-10">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
              {{ editingApp ? 'Edit App' : 'Add New App' }}
            </h3>
            <AppForm 
              :initial-data="editingApp || {}"
              :is-editing="!!editingApp"
              @submit="editingApp ? handleUpdate($event) : handleCreate($event)"
              @cancel="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
