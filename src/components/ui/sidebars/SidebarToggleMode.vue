<template>
   <div class="flex items-center">
      <button @click="$emit('toggle')" class="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200">
         <SunIcon v-if="isDarkMode" class="w-6 h-6 text-gray-300 hover:text-white" />
         <MoonIcon v-else class="w-6 h-6 text-gray-600 hover:text-black" />
      </button>
   </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { SunIcon, MoonIcon } from "lucide-vue-next";

const props = defineProps<{
   isSidebarExpanded: boolean;
   isDarkMode: boolean;
}>();

let text = ref("");

if (props.isDarkMode == true) {
   text.value = "Modo oscuro";
} else {
   text.value = "Modo claro";
}
</script>
