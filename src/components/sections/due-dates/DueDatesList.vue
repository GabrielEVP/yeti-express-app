<template>
   <Dropdown>
      <template #header>
         <CalendarDays class="h-5 w-5" />
         <span class="font-medium"> Pagos ({{ dueDates.length }}) </span>
      </template>
      <template #data>
         <div v-if="dueDates.length > 0" v-for="dueDate in dueDates" :key="dueDate.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
            <div class="flex justify-between items-start">
               <div class="space-y-1">
                  <p class="font-medium">Fecha: {{ dueDate.date }}</p>
                  <p class="text-sm">Monto: {{ dueDate.amount }}</p>
               </div>
            </div>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { CalendarDays } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   dueDates: any;
}>();
</script>
