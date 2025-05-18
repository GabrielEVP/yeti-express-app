<template>
  <Card>
    <div class="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
      <h3 class="text-sm font-medium text-gray-500">{{ title }}</h3>
    </div>
    <div class="p-6 pt-0">
      <slot></slot>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Card } from "@/components/";

defineProps<{
  title: string;
}>();
</script>
