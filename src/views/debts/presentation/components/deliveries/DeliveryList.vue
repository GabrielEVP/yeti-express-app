<template>
  <PaymentFullModalDebt
    v-if="selectedDelivery"
    v-model:isOpen="isFullModalOpen"
    :delivery="selectedDelivery"
    @proccess="handlePaymentProcess"
  />
  <PaymentPartialModalDebt
    v-if="selectedDelivery"
    v-model:isOpen="isPartialModalOpen"
    :delivery="selectedDelivery"
    @proccess="handlePaymentProcess"
  />
  <div class="space-y-3 mt-6 px-2 sm:px-0">
    <div
      v-for="delivery in paginatedItems"
      :key="delivery.getId()"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      <div class="sm:hidden p-4 space-y-4">
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-2">
            <span
              class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-md"
            >
              {{ delivery.getNumber() }}
            </span>
            <span
              class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full"
              :class="getStatusClasses(delivery.getPaymentStatusToFormat())"
            >
              {{ delivery.getPaymentStatusToFormat() }}
            </span>
          </div>
          <div
            v-if="
              !delivery.getPaymentStatusToFormat().toLowerCase().includes('pagado') ||
              delivery.getPaymentStatusToFormat().toLowerCase().includes('parcialmente pagado')
            "
            class="text-right"
          >
            <div class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ formatToDollars(delivery.getDebts()?.getRemainingAmount() ?? 0) }}
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Resta pendiente</div>
          </div>
        </div>

        <!-- Fecha -->
        <div class="flex items-center gap-2">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="text-sm text-gray-600 dark:text-gray-300">
            {{ formatDateCustom(delivery.getDate()) }}
          </span>
        </div>

        <!-- Botones de acción -->
        <div
          v-if="
            !delivery.getPaymentStatusToFormat().toLowerCase().includes('pagado') ||
            delivery.getPaymentStatusToFormat().toLowerCase().includes('parcialmente pagado')
          "
          class="flex flex-col gap-2.5"
        >
          <button
            @click="openFull(delivery as Delivery)"
            class="w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm active:scale-98"
          >
            💳 Pagar Todo
          </button>
          <button
            @click="openPartial(delivery as Delivery)"
            class="w-full px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98"
          >
            💰 Pago Parcial
          </button>
        </div>
      </div>
      <div class="p-4 hidden sm:flex items-center justify-between">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-3">
            <span
              class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-md"
            >
              {{ delivery.getNumber() }}
            </span>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDateCustom(delivery.getDate()) }}
          </div>
          <Bagde>
            {{ delivery.getPaymentStatusToFormat() }}
          </Bagde>
        </div>
        <div
          v-if="
            !delivery.getPaymentStatusToFormat().toLowerCase().includes('pagado') ||
            delivery.getPaymentStatusToFormat().toLowerCase().includes('parcialmente pagado')
          "
          class="flex items-center gap-8"
        >
          <div class="text-right">
            <Text class="text-lg font-semibold">
              {{ formatToDollars(delivery.getDebts()?.getRemainingAmount() ?? 0) }}
            </Text>
            <Text class="text-sm text-gray-500 dark:text-gray-400">
              Resta: {{ formatToDollars(delivery.getDebts()?.getRemainingAmount() ?? 0) }}
            </Text>
          </div>

          <div
            v-if="
              !delivery.getPaymentStatusToFormat().toLowerCase().includes('pagado') ||
              delivery.getPaymentStatusToFormat().toLowerCase().includes('parcialmente pagado')
            "
            class="flex gap-2"
          >
            <Button
              @click="openFull(delivery as Delivery)"
              class="text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Pagar Todo
            </Button>
            <Button
              @click="openPartial(delivery as Delivery)"
              class="text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Pago Parcial
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío - sin cliente -->
    <div
      v-if="!clientId"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8"
    >
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-3">
          <svg
            class="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
          Selecciona un cliente
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Elige un cliente para ver sus entregas pendientes
        </p>
      </div>
    </div>

    <!-- Estado vacío - sin entregas -->
    <div
      v-if="paginatedItems.length === 0 && clientId"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-6 sm:p-8"
    >
      <div class="text-center">
        <div class="text-gray-400 dark:text-gray-500 mb-3">
          <svg
            class="w-12 h-12 sm:w-16 sm:h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">No hay entregas</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Este cliente no tiene entregas registradas
        </p>
      </div>
    </div>
  </div>

  <!-- Paginación -->
  <Card v-if="totalPages > 0" class="mt-6 mx-2 sm:mx-0">
    <div class="p-4">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div class="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          <span class="font-medium">Página {{ currentPage }}</span> de {{ totalPages }} •
          <span class="font-medium">{{ paginatedItems.length }}</span> entregas
        </div>
        <div class="flex items-center justify-center sm:justify-end gap-3">
          <Button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[100px] justify-center"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span class="hidden xs:inline">Anterior</span>
          </Button>
          <Button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 min-w-[100px] justify-center"
          >
            <span class="hidden xs:inline">Siguiente</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Delivery } from '@views/deliveries';
import { usePagination } from '@/composables/';
import { formatDateCustom, formatToDollars } from '@/utils/';
import { Card, Bagde, Button, Text } from '@/components/';
import PaymentFullModalDebt from '../payment/PaymentFullModal.Debt.vue';
import PaymentPartialModalDebt from '../payment/PaymentPartialModal.Debt.vue';

const props = defineProps<{
  clientId: string | null;
  paymentStatus: string;
  deliveries: Delivery[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
}>();

const deliveriesRef = ref(props.deliveries);
const { currentPage, totalPages, paginatedItems, updatePage } = usePagination(deliveriesRef, 15);

// Watch for changes in props.deliveries
watch(
  () => props.deliveries,
  (newDeliveries) => {
    deliveriesRef.value = newDeliveries;
  }
);

const selectedDelivery = ref<Delivery>();

const isFullModalOpen = ref(false);
const isPartialModalOpen = ref(false);

const openFull = (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  isFullModalOpen.value = true;
};

const openPartial = (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  isPartialModalOpen.value = true;
};

const handlePaymentProcess = () => {
  emit('refresh');
};

// Función para obtener las clases de estado
const getStatusClasses = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full';

  switch (status.toLowerCase()) {
    case 'pendiente':
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`;
    case 'pagado':
    case 'paid':
      return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200`;
    case 'parcialmente pagado':
    case 'partially-paid':
      return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`;
  }
};
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}

/* Breakpoint personalizado para xs */
@media (min-width: 475px) {
  .xs\:inline {
    display: inline;
  }
}
</style>
