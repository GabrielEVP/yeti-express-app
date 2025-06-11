<template>
  <Button
    @click="handleClick"
    class="bg-blue-500 hover:bg-blue-600 text-white transition-colors"
    :disabled="isLoading"
  >
    <svg
      v-if="isLoading"
      class="w-4 h-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <svg
      v-else
      class="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  </Button>
</template>

<script setup lang="ts">
import Button from '@components/ui/Button.vue';
import { ref } from 'vue';

const isLoading = ref(false);

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const handleClick = async (event: MouseEvent) => {
  isLoading.value = true;
  try {
    await emit('click', event);
  } finally {
    isLoading.value = false;
  }
};
</script>
