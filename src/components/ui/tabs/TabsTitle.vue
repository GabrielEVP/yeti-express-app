<template>
  <nav class="flex gap-x-1">
    <button
      type="button"
      @click="changeTab"
      class="flex items-center text-sm font-medium transition-all px-3"
      :class="{
        'border-black border-b-2 dark:border-white text-black': isActive,
        'text-gray-500 hover:text-gray-700': !isActive,
      }"
    >
      <slot></slot>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";

const props = defineProps<{
  tab: string;
  activeTab: string;
}>();

const emit = defineEmits<{
  (event: "update:activeTab", value: string): void;
}>();

// Computed property to check if the tab is active
const isActive = computed(() => props.activeTab === props.tab);

// Emit event to parent when tab is clicked
const changeTab = () => {
  emit("update:activeTab", props.tab);
};
</script>
