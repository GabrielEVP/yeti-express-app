<template>
  <RouterLink
    :to="url"
    class="text-sm text-gray-700 hover:text-gray-900 inline-flex items-center dark:text-gray-400 dark:hover:text-white"
  >
    <slot />
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  url: string;
}>();
</script>
