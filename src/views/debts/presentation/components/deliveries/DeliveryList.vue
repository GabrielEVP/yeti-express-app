<template>
  <div class="space-y-2 sm:space-y-3 mt-6">
    <div
      v-for="delivery in paginatedItems"
      :key="delivery.getId()"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      <div class="p-3 hidden sm:flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span
              class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
            >
              {{ delivery.getId() }}
            </span>
            <span class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full">
              {{ delivery.getPaymentStatus() }}
            </span>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ delivery.getDate() }}
          </div>
        </div>

        <div class="flex items-center gap-8">
          <div class="text-right">
            <div class="text-lg font-light text-gray-900 dark:text-gray-100">
              {{ delivery.getService().getAmount() }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Resta: {{ delivery.getService().getAmount() }}
            </div>
          </div>

          <div class="flex gap-2">
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm"
            >
              Pagar Todo
            </button>
            <button
              class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Pago Parcial
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!clientId"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-8"
    >
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p class="text-gray-500 dark:text-gray-400">Selecciona un cliente</p>
      </div>
    </div>
    <div
      v-if="paginatedItems.length === 0 && clientId"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-8"
    >
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p class="text-gray-500 dark:text-gray-400">No se encontraron entregas</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Delivery } from '@views/deliveries';
import { usePagination } from '@composables';
import { GetAllDeliveriesUseCase } from '@/views/deliveries/use-cases/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';

const props = defineProps<{ clientId: string | null }>();

const repository = new DeliveryRepositoryImpl();
const getDeliveriesUseCase = new GetAllDeliveriesUseCase(repository);

const deliveries = ref<Delivery[]>([]);

const fetchDeliveries = async () => {
  if (!props.clientId) {
    deliveries.value = [];
    return;
  }

  const all = await getDeliveriesUseCase.execute();
  deliveries.value = all.filter((d) => d.getClient().getId() === props.clientId);
};

onMounted(fetchDeliveries);
watch(() => props.clientId, fetchDeliveries);

const { paginatedItems } = usePagination(deliveries, 15);
</script>
