<template>
   <component
      :is="URL ? 'router-link' : 'button'"
      :to="URL"
      @click="handleClick"
      class="h-10 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
   >
      <Plus class="h-4 w-4" />
      {{ label }}
   </component>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { defineProps, defineEmits } from "vue";

const emit = defineEmits<{
   (e: "click"): void;
}>();

const props = defineProps<{
   label: string;
   URL?: string;
}>();

const handleClick = () => {
   if (!props.URL) emit("click");
};
</script>
