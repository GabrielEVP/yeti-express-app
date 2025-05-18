<template>
  <div
    class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
  >
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-sm text-gray-600 dark:text-gray-400">
        {{ metric.label }}
      </h3>
      <span
        class="text-xs text-green-600 dark:text-green-400 flex items-center"
      >
        +{{ metric.percentage }}%
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </div>
    <p class="text-2xl font-semibold text-gray-900 dark:text-white">
      {{ metric.value.toLocaleString() }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{ metric: { label: string; value: number; percentage: number } }>();
</script>
