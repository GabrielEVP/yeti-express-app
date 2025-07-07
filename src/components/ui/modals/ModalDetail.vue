<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-gray-900/75 backdrop-blur-sm" @click="$emit('close')"></div>
      <Transition
        enter-active-class="transition ease-out duration-300 delay-100"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isOpen"
          class="relative w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <header class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              <slot name="header"></slot>
            </h2>
            <button @click="$emit('close')">
              <Close class="w-5 h-5" />
            </button>
          </header>
          <div class="overflow-y-auto max-h-[calc(90vh-8rem)] px-6 py-6 dark:bg-gray-800">
            <slot></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Close from '@/components/buttons/Close.vue';

defineProps<{
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
  (e: 'confirm'): void;
}>();
</script>
