<template>
  <div v-show="activeTab === tab" class="mt-4 mb-4">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
  tab: string;
  activeTab: string;
}>();
</script>
