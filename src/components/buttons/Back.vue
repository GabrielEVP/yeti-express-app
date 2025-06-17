<template>
  <button
    @click="router.back()"
    class="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-white dark:hover:text-gray-800 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 hover:-translate-x-1"        >
      <span class="text-lg">‹</span>
      Volver
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

