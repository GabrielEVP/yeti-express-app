<template>
  <Button
    :disabled="disabled"
    class="text-white bg-black hover:bg-gray-900 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Aceptar
  </Button>
</template>

<script setup lang="ts">
import Button from '@components/ui/Button.vue';

defineProps<{ disabled?: boolean }>();
</script>
