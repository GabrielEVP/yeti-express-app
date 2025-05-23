<template>
   <transition name="fade">
      <div v-if="show" class="fixed bottom-5 right-5 z-50 flex w-96 shadow-lg rounded-lg bg-green-600">
         <div class="py-4 px-6 rounded-l-lg flex items-center">
            <CheckCircle2 class="text-white" />
         </div>
         <div class="px-4 py-6 bg-white dark:bg-gray-800 dark:text-gray-200 rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200 dark:border-gray-800">
            {{ message }}
         </div>
      </div>
   </transition>
</template>

<script setup lang="ts">
import { CheckCircle2 } from "lucide-vue-next";

defineProps<{
   show: boolean;
   message: string;
}>();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
   opacity: 0;
}
</style>
