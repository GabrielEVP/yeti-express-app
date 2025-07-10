<template>
  <Button
    class="bg-green-500 hover:bg-green-600 text-white"
    title="Copiar para WhatsApp"
  >
    <MessageSquareMore class="w-5 h-5" />
  </Button>
</template>

<script setup lang="ts">
import { MessageSquareMore } from 'lucide-vue-next';
import { Button } from '@components';
</script>
