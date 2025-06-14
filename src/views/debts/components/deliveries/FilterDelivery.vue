<template>
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 rounded-lg shadow-sm mt-4">
    <div class="p-4 sm:p-6">
      <div class="flex flex-col gap-4">
        <div class="overflow-x-auto">
          <div class="flex gap-1 min-w-max sm:min-w-0">
            <button
              v-for="option in options"
              :key="option.value"
              @click="handleStatusChange(option.value)"
              class="px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap"
              :class="getButtonClass(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface StatusOption {
  label: string;
  value: string;
}

interface Props {
  options: StatusOption[];
  modelValue: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleStatusChange = (value: string) => {
  emit('update:modelValue', value);
};

const getButtonClass = computed(() => (value: string) => {
  return props.modelValue === value
    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700';
});
</script>
