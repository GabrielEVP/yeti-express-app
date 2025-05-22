<template>
   <Dropdown>
      <template #header>
         <NotepadText class="h-5 w-5" />
         <span class="font-medium">Productos ({{ lines.length }})</span>
      </template>
      <template #data>
         <div v-if="lines.length > 0" v-for="line in lines" :key="line.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
            <div class="flex justify-between items-start">
               <div class="space-y-1 text-sm">
                  <p><span class="font-medium">Descripción:</span> {{ line.description }}</p>
                  <p><span class="font-medium">Cantidad:</span> {{ line.quantity }}</p>
                  <p><span class="font-medium">Precio Unitario:</span> {{ line.unitPrice }}</p>
                  <p><span class="font-medium">Total:</span> {{ line.total }}</p>
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
