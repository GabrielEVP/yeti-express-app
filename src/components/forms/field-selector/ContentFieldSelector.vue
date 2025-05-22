<template>
   <ul class="max-h-60 overflow-auto py-1">
      <template v-if="items.length">
         <li v-for="item in items" :key="item.id" class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200" @click="selectItem(item)">
            {{ item[displayKey] }}
         </li>
      </template>
      <template v-else>
         <li class="px-4 py-2 text-gray-500 dark:text-gray-400 italic">No hay elementos para mostrar</li>
      </template>
   </ul>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

defineProps<{
   items: any[];
   displayKey: string;
   selectedValue: string | number | null;
}>();

const emit = defineEmits<{
   (event: "update", value: Record<string, any>): void;
}>();

const selectItem = (item: Record<string, any>) => {
   emit("update", item);
};
</script>
