<template>
   <input
      type="text"
      :value="modelValue"
      @input="updateValue"
      class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
   />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
   modelValue?: string;
}>();

const emit = defineEmits<{
   (e: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
   const newValue = (event.target as HTMLInputElement).value;
   emit("update:modelValue", newValue);
};
</script>
