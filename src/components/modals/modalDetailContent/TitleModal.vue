<template>
  <div class="relative px-8 pt-8 pb-6 border-b border-gray-100">
    <div class="flex items-center gap-4 mb-2">
      <div class="relative">
        <div class="p-3 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl shadow-lg">
          <Building2 class="h-6 w-6 text-white" />
        </div>
      </div>
      <div>
        <h2 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
          <slot />
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Building2 } from 'lucide-vue-next';
</script>