<template>
   <div class="flex items-center justify-center h-full text-gray-500">{{ title || "No hay datos para mostrar" }}</div>
</template>

<script setup lang="ts">
defineProps<{
   title?: string;
}>();
</script>
