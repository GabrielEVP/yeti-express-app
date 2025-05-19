<template>
   <Dropdown>
      <template #header>
         <Phone class="h-5 w-5" />
         <span class="font-medium"> Teléfonos ({{ phones.length }}) </span>
      </template>
      <template #data>
         <div v-if="phones.length > 0" v-for="phone in phones" :key="phone.id" class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700">
            <div>
               <p class="font-medium">{{ phone.name }}</p>
               <p>{{ phone.phone }}</p>
            </div>
            <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold dark:border-gray-600">
               {{ phone.type === "work" ? "Trabajo" : "Personal" }}
            </span>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Phone } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   phones: any;
}>();
</script>
