<template>
  <div class="border-b">
    <!-- Mobile view -->
    <div class="block lg:hidden p-2">
      <select
        v-model="activeTab"
        class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
        @change="updateActiveTab"
      >
        <slot name="mobile"></slot>
      </select>
    </div>

    <!-- Desktop view -->
    <div class="hidden lg:flex h-14 w-full justify-start rounded-none gap-2">
      <slot name="desktop"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps<{
  activeTab: string;
}>();

const emit = defineEmits(["update:activeTab"]);

// Local state for activeTab to handle changes
const activeTab = ref(props.activeTab);

// Emit event to parent when value changes
const updateActiveTab = () => {
  emit("update:activeTab", activeTab.value);
};
</script>
