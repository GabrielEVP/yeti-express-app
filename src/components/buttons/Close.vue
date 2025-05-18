<template>
   <button type="button" class="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <slot></slot>
      <X class="h-6 w-6" />
   </button>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";
</script>
