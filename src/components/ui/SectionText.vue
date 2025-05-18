<template>
   <div>
      <p class="text-sm font-medium text-muted-foreground dark:text-gray-400">
         {{ title }}
      </p>
      <p>{{ content }}</p>
   </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
   title: string;
   content: string;
}>();
</script>
