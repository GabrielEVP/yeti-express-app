<template>
   <div class="flex items-center rounded-md">
      <button
         @click="$emit('toggle')"
         :class="[isSidebarExpanded ? '' : 'justify-center']"
         class="w-full px-4 pl-4 flex rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
      >
         <SunIcon v-if="isDarkMode" class="w-7 h-7 text-gray-300" />
         <MoonIcon v-else class="w-7 h-7 text-gray-600" />
         <span v-show="isSidebarExpanded" class="ml-4 text-black dark:text-gray-300 whitespace-nowrap">
            {{ text }}
         </span>
      </button>
   </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";
import { SunIcon, MoonIcon } from "lucide-vue-next";

const props = defineProps<{
   isSidebarExpanded: boolean;
   isDarkMode: boolean;
}>();

defineEmits(["toggle"]);

const text = computed(() => (props.isDarkMode ? "Modo oscuro" : "Modo claro"));
</script>
