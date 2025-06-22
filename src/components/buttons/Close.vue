<template>
   <button type="button" class="text-gray-400 hover:text-gray-500">
      <slot></slot>
      <X class="h-6 w-6" />
   </button>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
</script>
