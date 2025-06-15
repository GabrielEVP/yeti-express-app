<template>
  <Card v-if="totalPages > 0" class="mt-6 mx-2 sm:mx-0">
    <div class="p-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          <span class="font-medium">Página {{ currentPage }}</span> de {{ totalPages }} • <span class="font-medium">{{ itemsCount }}</span>
          {{ itemLabel }}
        </div>
        <div class="flex items-center justify-center sm:justify-end gap-3">
          <Button
            @click="$emit('previous')"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[100px] justify-center"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span class="hidden xs:inline">Anterior</span>
          </Button>
          <Button
            @click="$emit('next')"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[100px] justify-center"
          >
            <span class="hidden xs:inline">Siguiente</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card, Button } from '@/components/';

interface Props {
  currentPage: number;
  totalPages: number;
  itemsCount: number;
  itemLabel?: string;
}

withDefaults(defineProps<Props>(), {
  itemLabel: 'elementos',
});

defineEmits<{
  (e: 'previous'): void;
  (e: 'next'): void;
}>();
</script>

<style scoped>
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
}
</style>
