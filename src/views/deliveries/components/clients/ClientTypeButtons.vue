<template>
  <div class="mb-4">
    <div class="grid grid-cols-2 gap-4 mt-3 mb-4">
      <Button type="button" class="bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300">
        Cliente Regular
      </Button>
      <Button type="button" class="bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300">
        Cliente Anónimo
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button } from '@/components';
</script>
