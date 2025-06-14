<template>
  <div class="sm:hidden p-4 space-y-4">
    <div class="flex items-start justify-between">
      <div class="flex flex-col gap-2">
        <span class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-md">
          {{ delivery.number }}
        </span>
        <span class="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full" :class="getStatusClasses(delivery.status)">
          {{ getDeliveryPaymentStatusLabel(delivery.paymentStatus) }}
        </span>
      </div>
      <div v-if="showPaymentInfo" class="text-right">
        <div class="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {{ formatToDollars(delivery.amount ?? 0) }}
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400">Resta pendiente</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">{{ formatToDollars(delivery.debtRemainingAmount ?? 0) }}</div>
      </div>
    </div>

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
        {{ formatDateCustom(delivery.date) }}
      </span>
    </div>

    <div v-if="showPaymentButtons" class="flex flex-col gap-2.5">
      <button
        @click="$emit('payFull', delivery)"
        class="w-full px-4 py-3 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm active:scale-98"
      >
        Pagar Todo
      </button>
      <button
        @click="$emit('payPartial', delivery)"
        class="w-full px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 active:scale-98"
      >
        Pago Parcial
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Delivery, getDeliveryPaymentStatusLabel } from '@views/deliveries';
import { DeliveryPaymentStatus } from '@views/deliveries';
import { formatDateCustom, formatToDollars } from '@/utils/';

interface Props {
  delivery: Delivery;
}

const props = defineProps<Props>();

defineEmits<{
  (e: 'payFull', delivery: Delivery): void;
  (e: 'payPartial', delivery: Delivery): void;
}>();

const showPaymentInfo = computed(() => {
  return props.delivery.paymentStatus != DeliveryPaymentStatus.PAID;
});

const showPaymentButtons = computed(() => {
  return props.delivery.paymentStatus != DeliveryPaymentStatus.PAID;
});

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
</style>
