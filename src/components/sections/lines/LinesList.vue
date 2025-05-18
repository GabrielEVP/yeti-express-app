<template>
   <Dropdown>
      <template #header>
         <NotepadText class="h-5 w-5" />
         <span class="font-medium"> Lineas ({{ lines.length }}) </span>
      </template>
      <template #data>
         <div v-if="lines.length > 0" v-for="line in lines" :key="line.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
            <div class="flex justify-between items-start">
               <div class="space-y-1">
                  <p class="font-medium">{{ line.description }}</p>
                  <p class="text-sm">
                     {{ line.quantity }}, {{ line.unitPrice }},
                     {{ line.taxRate }}
                  </p>
                  <p class="text-sm">Total sin IVA: {{ line.totalAmount }}</p>
                  <p class="text-sm">Total con IVA: {{ line.totalTaxAmount }}</p>
               </div>
            </div>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { NotepadText } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   lines: any;
}>();
</script>
