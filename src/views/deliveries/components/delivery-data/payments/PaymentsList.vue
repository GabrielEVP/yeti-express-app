<template>
   <Dropdown>
      <template #header>
         <HandCoins class="h-5 w-5" />
         <span class="font-medium"> Pagos ({{ payments.length }}) </span>
      </template>
      <template #data>
         <div v-if="payments.length > 0" v-for="payment in payments" :key="payment.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
            <div class="flex justify-between items-start">
               <div class="space-y-1">
                  <p class="font-medium">Fecha: {{ payment.date }}</p>
                  <p class="text-sm">Monto: {{ payment.amount }}</p>
               </div>
            </div>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { HandCoins } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   payments: any;
}>();
</script>
