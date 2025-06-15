<template>
  <Button type="button" class="bg-green-500 hover:bg-green-600 text-white transition-colors">
    <PackageCheck class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import { PackageCheck } from 'lucide-vue-next';
import { Button } from '@components';
</script>
