<template>
  <span class="flex items-center">
    <span :class="`w-2 h-2 rounded-full mr-1 ${colorClass}`"></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ label: string; colorClass: string }>();
</script>
