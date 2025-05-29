<template>
  <div class="relative group">
    <router-link :to="route">
      <div
        class="relative flex items-center p-3 rounded-xl transition-all duration-200 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <slot></slot>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  route: string;
}>();
</script>
