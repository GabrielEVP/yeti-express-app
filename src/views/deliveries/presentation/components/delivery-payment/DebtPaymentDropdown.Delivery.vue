<template>
  <Dropdown>
    <template #header>
      <CreditCard class="h-5 w-5" />
      <span class="font-medium">Cobros al cliente ({{ none.length }}) </span>
    </template>
    <template #data>
      <div v-if="none.length > 0" class="space-y-3">
        <div
          v-for="none in none"
          :key="none.id"
          class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
        >
          <div class="flex justify-between items-start">
            <div class="space-y-1 text-sm">
              <p class="font-medium">Fecha: {{}}</p>
              <p>
                Método:
                <span class="font-semibold">{{}}</span>
              </p>
              <p>Monto: {{}}</p>
            </div>
          </div>
        </div>
      </div>
      <EmptyData v-else class="mt-10" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { CreditCard } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';

/**
 * defineProps<{
  DeliveryClientPayments: DeliveryClientCharge[];
}>();
*/
</script>
