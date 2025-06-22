<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
    <div class="flex flex-col sm:flex-row items-center justify-start gap-4">
      <slot />
      <div class="flex items-center gap-2">
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Filtrar por:</span>
        <select
          v-model="selectedRange"
          class="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          @change="onRangeChange"
        >
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  initialRange?: 'day' | 'week' | 'month' | 'year';
  initialDate?: string;
}>();

const emit = defineEmits<{
  (e: 'filterChange', range: 'day' | 'week' | 'month' | 'year', date: string): void;
}>();

const selectedRange = ref<'day' | 'week' | 'month' | 'year'>(props.initialRange || 'week');
const selectedDate = ref(props.initialDate || new Date().toISOString().split('T')[0]);

const onRangeChange = () => {
  emit('filterChange', selectedRange.value, selectedDate.value);
};

const onDateChange = () => {
  emit('filterChange', selectedRange.value, selectedDate.value);
};

watch(
  () => props.initialRange,
  (newValue) => {
    if (newValue) {
      selectedRange.value = newValue;
    }
  }
);

watch(
  () => props.initialDate,
  (newValue) => {
    if (newValue) {
      selectedDate.value = newValue;
    }
  }
);
</script>
