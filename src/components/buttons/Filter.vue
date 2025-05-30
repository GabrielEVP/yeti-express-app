<template>
  <div class="relative">
    <Button
      @click="toggleFilter"
      class="border bg-white dark:bg-gray-800 border-gray-800 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <SlidersHorizontal class="h-4 w-4 mr-2" />
      Filtros
      <ChevronDown class="h-4 w-4 ml-1" :class="{ 'rotate-180': isFilterOpen }" />
    </Button>
    <Card v-if="isFilterOpen" class="absolute w-64 top-14 p-4 z-10 border">
      <div class="space-y-4">
        <slot></slot>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SlidersHorizontal, ChevronDown } from 'lucide-vue-next';
import { Card, Button } from '@/components';

const isFilterOpen = ref(false);

const toggleFilter = () => {
  isFilterOpen.value = !isFilterOpen.value;
};

const applyFilters = () => {
  isFilterOpen.value = false;
};
</script>
