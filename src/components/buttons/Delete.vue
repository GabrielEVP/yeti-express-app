<template>
  <Button
    type="button"
    @click="handleClick"
    class="bg-red-600 hover:bg-red-700 text-white transition-colors"
  >
    Borrar
  </Button>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import { Button } from "@/components/";

const emit = defineEmits<{
  (e: "click"): void;
}>();

const handleClick = () => {
  emit("click");
};
</script>
