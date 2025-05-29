<template>
   <div class="flex items-center">
      <button
         @click="toggleProfileMenu"
         class="flex items-center justify-center w-14 h-14 min-w-14 min-h-14 max-w-14 max-h-14 rounded-sm ring-2 ring-primary-500 p-0.5 transition-transform hover:scale-105 overflow-hidden bg-primary-600 text-white font-bold text-lg"
      >
         <span class="bg-gray-900 w-full h-full flex items-center justify-center">YE</span>
      </button>
   </div>
   <div
      v-if="isOpen"
      v-click-outside="closeProfileMenu"
      class="absolute left-full bottom-0 mb-0 ml-2 w-40 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-1 transform transition-all duration-200 z-50"
   >
      <div class="relative">
         <button
            v-for="item in items"
            :key="item.label"
            @click="handleItemClick(item)"
            class="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-300 transition-colors duration-150"
         >
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.label }}
         </button>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref(false);

defineProps<{
   items: { label: string; icon: any; action: () => void }[];
}>();

function toggleProfileMenu() {
   isOpen.value = !isOpen.value;
}

function closeProfileMenu() {
   isOpen.value = false;
}

function handleItemClick(item: { action: () => void }) {
   item.action();
   closeProfileMenu();
}
</script>
