<template>
   <div class="relative border rounded-md dark:border-gray-700" v-click-outside="closeDropdown">
      <button ref="1" @click="openDropdown = !openDropdown" class="flex w-full items-center justify-between p-4 hover:bg-muted/50 dark:hover:bg-gray-800">
         <div class="flex items-center gap-2">
            <slot name="header"></slot>
         </div>
         <ChevronUp v-if="openDropdown" class="h-4 w-4" />
         <ChevronDown v-else class="h-4 w-4" />
      </button>
      <transition name="slide">
         <div v-show="openDropdown" class="shadow-xl border dark:border-gray-700 absolute rounded-b-sm bg-white dark:bg-gray-800 max-h-[300px] overflow-y-auto mt-2 px-4 pb-4 left-0 right-0 z-20">
            <div class="space-y-2 m-4">
               <slot name="data"></slot>
            </div>
         </div>
      </transition>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const openDropdown = ref(false);

const closeDropdown = () => {
   openDropdown.value = false;
};

const target = useTemplateRef<HTMLElement>("target");
onClickOutside(target, closeDropdown);
</script>
