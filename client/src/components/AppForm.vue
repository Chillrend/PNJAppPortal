<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      description: '',
      url: '',
      logo: '',
      category: 'General'
    })
  },
  isEditing: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['submit', 'cancel']);

const formData = ref({ ...props.initialData });

watch(() => props.initialData, (newVal) => {
  formData.value = { ...newVal };
});

const handleSubmit = () => {
  emit('submit', formData.value);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">App Title</label>
      <input 
        v-model="formData.title" 
        type="text" 
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="e.g. Jira"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea 
        v-model="formData.description" 
        rows="3"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="Brief description of the app..."
      ></textarea>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
      <input 
        v-model="formData.url" 
        type="url" 
        required
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="https://..."
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
      <input 
        v-model="formData.logo" 
        type="url" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="https://.../logo.png"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
      <input 
        v-model="formData.category" 
        type="text" 
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        placeholder="e.g. Development, HR, Finance"
      />
    </div>

    <div class="flex justify-end gap-3 pt-4">
      <button 
        type="button" 
        @click="$emit('cancel')"
        class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
      >
        Cancel
      </button>
      <button 
        type="submit"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
      >
        {{ isEditing ? 'Update App' : 'Add App' }}
      </button>
    </div>
  </form>
</template>
