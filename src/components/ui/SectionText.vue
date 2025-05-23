<template>
   <div class="w-full">
      <p class="text-sm font-medium text-muted-foreground dark:text-gray-400">
         {{ title }}
      </p>
      <div class="whitespace-pre-wrap break-words text-sm text-gray-900 dark:text-gray-100 mt-1">
         {{ content }}
      </div>
   </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
   title: string;
   content: string | number;
}>();
</script>
