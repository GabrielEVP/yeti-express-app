<template>
   <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <aside :class="[isSidebarExpanded ? 'w-64' : 'w-20', 'bg-white text-black h-screen flex flex-col fixed z-10 transition-[width] shadow-xl duration-300 ease-in-out', isDarkMode ? 'dark' : '']">
         <div class="h-20 flex items-center justify-center bg-gray-50 dark:bg-gray-700 shadow-sm" :class="[isSidebarExpanded ? '' : 'pl-2']">
            <slot name="header"></slot>
         </div>

         <slot name="items"></slot>

         <slot name="footer"></slot>

         <button @click="emitToggleSidebar" class="absolute -right-5 top-12 bg-black hover:bg-gray-800 dark:bg-gray-74300 hover:dark:bg-gray-600 rounded-full p-1 shadow-xl border border-gray-900">
            <ChevronRight v-if="!isSidebarExpanded" class="w-4 h-4 text-gray-300 dark:text-gray-400" />
            <ChevronLeft v-else class="w-4 h-4 text-gray-300 dark:text-gray-400 ml-" />
         </button>
      </aside>

      <div :class="[isSidebarExpanded ? 'ml-64' : 'ml-20', 'flex-1 transition-all duration-300 ease-in-out h-screen overflow-auto']">
         <main class="min-h-screen p-6">
            <slot name="content" />
         </main>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ChevronRight, ChevronLeft } from "lucide-vue-next";

defineProps({
   isSidebarExpanded: Boolean,
   isDarkMode: Boolean,
});

const emit = defineEmits(["toggleSidebarState"]);

function emitToggleSidebar() {
   emit("toggleSidebarState");
}
</script>
