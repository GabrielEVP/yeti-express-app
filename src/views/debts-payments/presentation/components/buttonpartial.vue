<template>
  <Button
    class="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <DollarSign class="w-4 h-4" />
    <slot />
  </Button>
</template>
<script setup lang="ts">
import { Button } from '@components';
import { DollarSign } from 'lucide-vue-next';
</script>
