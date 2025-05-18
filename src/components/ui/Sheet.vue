<template>
   <div>
      <button
         type="button"
         @click="toggleOpen"
         class="flex items-center justify-between w-full p-4 bg-white border rounded-lg hover:bg-gray-50 transition-colors duration-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
         <span class="font-medium text-gray-900 dark:text-white">{{ title }}</span>
         <ChevronDown v-if="!isOpen" class="h-5 w-5 text-gray-500 dark:text-gray-400" />
         <ChevronUp v-else class="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </button>
      <Transition
         enter-active-class="transition-opacity duration-300"
         enter-from-class="opacity-0"
         enter-to-class="opacity-100"
         leave-active-class="transition-opacity duration-200"
         leave-from-class="opacity-100"
         leave-to-class="opacity-0"
      >
         <div v-if="isOpen" @click="toggleOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40" />
      </Transition>
      <Transition
         enter-active-class="transition-transform duration-300 ease-in-out"
         enter-from-class="translate-x-full"
         enter-to-class="translate-x-0"
         leave-active-class="transition-transform duration-200 ease-in-out"
         leave-from-class="translate-x-0"
         leave-to-class="translate-x-full"
      >
         <div v-show="isOpen" class="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-6">
               <div class="flex justify-between items-center">
                  <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                     {{ title }}
                  </h2>
                  <button type="button" @click="toggleOpen" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                     <X class="h-6 w-6" />
                  </button>
               </div>
               <slot></slot>
            </div>
         </div>
      </Transition>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown, ChevronUp, X } from "lucide-vue-next";

defineProps<{
   title: string;
}>();

const isOpen = ref(false);

const toggleOpen = () => {
   isOpen.value = !isOpen.value;
   document.body.style.overflow = isOpen.value ? "hidden" : "";
};
</script>
