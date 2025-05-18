<template>
   <Dropdown>
      <template #header>
         <Mail class="h-5 w-5" />
         <span class="font-medium"> Correos Electrónicos ({{ emails.length }}) </span>
      </template>
      <template #data>
         <div v-if="emails.length > 0" v-for="email in emails" :key="email.id" class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700">
            <a :href="`mailto:${email.email}`" class="text-blue-600 hover:underline dark:text-blue-400">
               {{ email.email }}
            </a>
            <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold dark:border-gray-600">
               {{ email.type === "work" ? "Trabajo" : "Personal" }}
            </span>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Mail } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   emails: any;
}>();
</script>
