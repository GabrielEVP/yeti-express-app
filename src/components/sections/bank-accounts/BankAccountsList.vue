<template>
   <Dropdown>
      <template #header>
         <CreditCard class="h-5 w-5" />
         <span class="font-medium"> Cuentas Bancarias ({{ bankAccounts.length }}) </span>
      </template>
      <template #data>
         <div v-if="bankAccounts.length > 0" v-for="account in bankAccounts" :key="account.id" class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700">
            <div>
               <p class="font-medium">{{ account.name }}</p>
               <p class="font-mono text-sm">{{ account.accountNumber }}</p>
            </div>
            <span class="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold dark:border-gray-600">{{ getBankAccountTypeText(account.type) }}</span>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { CreditCard } from "lucide-vue-next";
import { getBankAccountTypeText } from "@utils";
import { Dropdown, EmptyData } from "@/components/";

defineProps<{
   bankAccounts: any;
}>();
</script>
