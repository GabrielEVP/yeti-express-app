<template>
   <teleport to="body">
      <div
         v-show="isVisible"
         ref="dropdownRef"
         :style="dropdownStyles"
         class="z-10 bg-white dark:bg-gray-700 dark:text-white shadow-lg rounded-md w-48 py-2 fixed"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
      >
         <div v-for="child in children" :key="child.id">
            <SidebarItems :is-open="isVisible" :item="child" :is-sidebar-open="isVisible" />
         </div>
      </div>
   </teleport>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import SidebarItems from "@/components/ui/sidebars/SidebarItems.vue";

defineProps<{
   isVisible: boolean;
   children?: any[];
   dropdownStyles: Record<string, string>;
}>();

const emit = defineEmits<{
   (e: "mouseenter"): void;
   (e: "mouseleave"): void;
}>();

const dropdownRef = ref<HTMLElement | null>(null);

function onMouseEnter() {
   emit("mouseenter");
}

function onMouseLeave() {
   emit("mouseleave");
}
</script>
