<template>
  <Card>
    <div class="p-4 sm:p-6">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 class="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate">
          {{ selectedClient?.getLegalName() }}
        </h2>
        <Button
          @click="$emit('open')"
          class="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cambiar Cliente
        </Button>
      </header>

      <footer
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t"
      >
        <section class="text-center">
          <Text>Entregas</Text>
          <p class="text-lg sm:text-xl font-light text-gray-900 dark:text-gray-100">2</p>
        </section>
        <section class="text-center">
          <Text>Total</Text>
          <p class="text-lg sm:text-xl font-light text-gray-900 dark:text-gray-100">3</p>
        </section>
        <section class="text-center">
          <Text>Pagado</Text>
          <p class="text-lg sm:text-xl font-light text-emerald-600 dark:text-emerald-400">4</p>
        </section>
        <section class="text-center">
          <Text>Pendiente</Text>
          <p class="text-lg sm:text-xl font-light text-amber-600 dark:text-amber-400">5</p>
        </section>
      </footer>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Button, Card, Text } from '@components';
import { Client } from '@/views/clients/domain/';

defineProps<{
  selectedClient: Client;
}>();
</script>
