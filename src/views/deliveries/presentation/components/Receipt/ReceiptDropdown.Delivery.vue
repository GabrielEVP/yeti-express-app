<template>
  <Dropdown>
    <template #header>
      <PackageCheck class="h-5 w-5" />
      <span class="font-medium">Dirección de Entrega</span>
    </template>
    <template #data>
      <div v-if="receipt" class="space-y-3">
        <div class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
          <div class="flex justify-between items-start">
            <div class="space-y-1 text-sm">
              <p><span class="font-medium">Nombre Completo:</span> {{ receipt.getFullName() }}</p>
              <p><span class="font-medium">Teléfono:</span> {{ receipt.getPhone() }}</p>
              <p><span class="font-medium">Dirección:</span> {{ receipt.getAddress() }}</p>
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
import { PackageCheck } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';
import type { DeliveryReceipt } from '@/views/deliveries';

defineProps<{
  receipt: DeliveryReceipt | null;
}>();
</script>
