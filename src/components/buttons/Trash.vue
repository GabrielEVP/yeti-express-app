<template>
  <Button
    type="button"
    class="bg-red-600 hover:bg-red-700 text-white transition-colors"
    title="Eliminar"
  >
    <Trash2 class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import Button from "@components/ui/Button.vue";
import { Trash2 } from "lucide-vue-next";
</script>
