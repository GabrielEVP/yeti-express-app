<template>
   <Button type="button" class="text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" title="Eliminar">
      <Plus class="h-4 w-4" />
      <slot></slot>
   </Button>
</template>

<script setup lang="ts">
import Button from "@components/ui/Button.vue";
import { Plus } from "lucide-vue-next";
</script>
