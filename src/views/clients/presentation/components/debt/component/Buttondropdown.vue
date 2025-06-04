<template>
  <Button
    type="button"
    class="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
  >
    <slot />
    <ChevronDown class="w-4 h-4" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@components';
import { ChevronDown } from 'lucide-vue-next';
</script>
