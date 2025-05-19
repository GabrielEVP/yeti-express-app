<template>
   <Dropdown>
      <template #header>
         <MapPin class="h-5 w-5" />
         <span class="font-medium"> Direcciones ({{ addresses.length }}) </span>
      </template>
      <template #data>
         <div v-if="addresses.length > 0" v-for="address in addresses" :key="address.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
            <div class="flex justify-between items-start">
               <div class="space-y-1">
                  <p class="font-medium">{{ address.address }}</p>
                  <p class="text-sm">
                     {{ address.city }}, {{ address.state }},
                     {{ address.country }}
                  </p>
                  <p class="text-sm">CP: {{ address.postalCode }}</p>
               </div>
               <span v-if="address.isBilling" class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold dark:border-gray-600"> Facturación </span>
            </div>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { MapPin } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   addresses: any;
}>();
</script>
