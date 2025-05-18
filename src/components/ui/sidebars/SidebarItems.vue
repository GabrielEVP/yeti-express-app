<template>
   <component
      :is="item.url ? 'router-link' : 'div'"
      :to="item.url"
      class="rounded-md flex items-center h-10 cursor-pointer w-full text-sm transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
      :class="!isSidebarOpen ? 'justify-center' : ''"
   >
      <div class="w-6 h-6 text-gray-900 dark:text-gray-100" :class="isSidebarOpen ? 'ml-2 mr-2' : ''">
         <component v-if="item.icon" :is="item.icon" />
      </div>

      <span v-if="isSidebarOpen" class="flex-1 text-black dark:text-white">
         {{ item.title }}
      </span>

      <div v-if="isSidebarOpen && hasChildren">
         <component :is="isOpen ? ChevronDown : ChevronRight" class="w-4 h-4 text-gray-900 dark:text-gray-100" />
      </div>
   </component>
</template>

<script setup lang="ts">
import { ChevronDown, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
   isOpen?: boolean;
   item: any;
   isSidebarOpen?: boolean;
}>();

const hasChildren = props.item.children && props.item.children.length > 0;
</script>
