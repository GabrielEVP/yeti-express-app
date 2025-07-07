<template>
  <div class="p-4 hidden sm:flex items-center justify-between">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3">
        <span class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-md">
          {{ delivery.number }}
        </span>
      </div>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatDateCustom(delivery.date) }}
      </div>
      <Bagde>
        {{ getDeliveryPaymentStatusLabel(delivery.payment_status) }}
      </Bagde>
    </div>
    <div v-if="showPaymentSection" class="flex items-center gap-8">
      <div class="text-right">
        <Text class="text-lg font-semibold">
          {{ formatToDollars(delivery.debt_amount ?? 0) }}
        </Text>
        <Text class="text-sm text-gray-500 dark:text-gray-400">
          Resta:
          {{ formatToDollars(delivery.debt_remaining_amount ?? 0) }}
        </Text>
      </div>

      <div v-if="showPaymentButtons" class="flex gap-2">
        <Button
          @click="$emit('payFull', delivery)"
          class="text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
        >
          Pagar Todo
        </Button>
        <Button
          @click="$emit('payPartial', delivery)"
          class="text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Pago Parcial
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DeliveryPaymentStatus, getDeliveryPaymentStatusLabel } from '@views/deliveries';
import { DeliveryWithDebt } from '@views/debts/models';
import { formatDateCustom, formatToDollars } from '@/utils/';
import { Bagde, Button, Text } from '@/components/';

interface Props {
  delivery: DeliveryWithDebt;
}

const props = defineProps<Props>();

defineEmits<{
  (e: 'payFull', delivery: DeliveryWithDebt): void;
  (e: 'payPartial', delivery: DeliveryWithDebt): void;
}>();

const showPaymentSection = computed(() => {
  return props.delivery.payment_status != DeliveryPaymentStatus.PAID;
});

const showPaymentButtons = computed(() => {
  const status = props.delivery.payment_status?.toLowerCase() || '';
  return !status.includes('pagado') || status.includes('parcialmente pagado');
});
</script>
