<template>
  <Dropdown>
    <template #header>
      <CreditCard class="h-5 w-5" />
      <span class="font-medium">Pagos al Repartidor ({{ DeliveryCourierpayments.length }}) </span>
    </template>
    <template #data>
      <div v-if="DeliveryCourierpayments.length > 0" class="space-y-3">
        <div
          v-for="DeliveryCourierpayment in DeliveryCourierpayments"
          :key="DeliveryCourierpayment.getId()"
          class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
        >
          <div class="flex justify-between items-start">
            <div class="space-y-1 text-sm">
              <p class="font-medium">Fecha: {{ DeliveryCourierpayment.getDate() }}</p>
              <p>
                Método:
                <span class="font-semibold">{{ DeliveryCourierpayment.getMethod() }}</span>
              </p>
              <p>Monto: {{ DeliveryCourierpayment.getAmount() }}</p>
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
import { DeliveryCourierPayout } from '@/views/deliveries/domain';

defineProps<{
  DeliveryCourierpayments: DeliveryCourierPayout[];
}>();
</script>
