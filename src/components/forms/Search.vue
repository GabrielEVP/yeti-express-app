<template>
  <div class="relative flex-1 max-w-md">
    <Input
      autofocus
      type="text"
      v-model="searchQuery"
      :placeholder="placeholder"
    />
    <Search
      class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Search } from "lucide-vue-next";
import { Input } from "@/components/";

const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const searchQuery = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
