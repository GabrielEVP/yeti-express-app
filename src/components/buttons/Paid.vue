<template>
  <Button
    class="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <CreditCard class="w-4 h-4" />
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { Button } from '@components';
import { CreditCard } from 'lucide-vue-next';
</script>
