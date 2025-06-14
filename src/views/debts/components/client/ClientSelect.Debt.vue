<template>
  <Card>
    <div class="p-4 sm:p-6">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
          {{ selectedClient?.legalName || 'Selecciona un cliente' }}
        </h2>
        <Button
          @click="$emit('open')"
          class="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cambiar Cliente
        </Button>
      </header>
      <footer class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t">
        <section class="text-center">
          <Text>Entregas</Text>
          <Bagde>
            {{ stast?.total_deliveries_with_debt ?? 0 }}
          </Bagde>
        </section>
        <section class="text-center">
          <Text>Total Facturado</Text>
          <Bagde>{{ formatToDollars(stast?.total_invoiced ?? 0) }}</Bagde>
        </section>
        <section class="text-center">
          <Text>Total de Ganancia</Text>
          <Bagde>{{ formatToDollars(stast?.total_paid ?? 0) }}</Bagde>
        </section>
        <section class="text-center">
          <Text>Deuda Pendiente</Text>
          <Bagde>{{ formatToDollars(stast?.total_pending ?? 0) }}</Bagde>
        </section>
      </footer>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { formatToDollars } from '@utils';
import { Bagde, Button, Card, Text } from '@components';
import { Client } from '@/views/clients';

interface Stast {
  total_deliveries_with_debt: number;
  total_invoiced: number;
  total_paid: number;
  total_pending: number;
}

defineProps<{
  selectedClient: Client | null;
  stast: Stast | null;
}>();
</script>
