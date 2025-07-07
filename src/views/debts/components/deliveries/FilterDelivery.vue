<template>
  <PaymentFullModalDebt
    v-if="selectedclientId"
    v-model:isOpen="isFullModalOpen"
    :client_id="selectedclientId"
    :totalDebtAmount="0"
    @process="handleFullPaymentProcess"
    :stast="stast"
  />
  <PaymentPartialModalDebt
    v-if="selectedclientId"
    v-model:isOpen="isPartialModalOpen"
    :client_id="selectedclientId"
    :totalDebtAmount="0"
    @process="handlePartialPaymentProcess"
    :stast="stast"
  />
  <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 rounded-lg shadow-sm mt-4">
    <div class="p-4 sm:p-6">
      <div class="flex flex-col gap-4">
        <div class="overflow-x-auto">
          <div class="flex gap-1 min-w-max sm:min-w-0">
            <button
              v-for="option in options"
              :key="option.value"
              @click="handleStatusChange(option.value)"
              class="px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap"
              :class="getButtonClass(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
        <div v-if="stast && stast?.total_pending > 0" class="flex flex-col sm:flex-row sm:justify-end gap-3 mt-4">
          <Button
            @click="openFull(clientId as string)"
            class="flex-1 sm:flex-initial px-4 py-2.5 text-sm font-semibold text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span class="flex items-center justify-center gap-2">Pagar Todo</span>
          </Button>

          <Button
            @click="openPartial(clientId as string)"
            class="flex-1 sm:flex-initial px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span class="flex items-center justify-center gap-2">Pago Parcial</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { Button } from '@/components/';
import PaymentFullModalDebt from '../payment/clients/PaymentFullDebtModal.Debt.vue';
import PaymentPartialModalDebt from '../payment/clients/PaymentPartialDebtModal.Debt.vue';
import { Stast } from '@views/clients';

interface StatusOption {
  label: string;
  value: string;
}

interface Props {
  options: StatusOption[];
  modelValue: string;
  clientId?: string;
  stast: Stast | null;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;

  (e: 'payFull', delivery: any): void;

  (e: 'payPartial', delivery: any): void;

  (e: 'refresh'): void;
}

const selectedclientId = ref('');
const isFullModalOpen = ref(false);
const isPartialModalOpen = ref(false);

const openFull = (clientId: string) => {
  selectedclientId.value = clientId;
  isFullModalOpen.value = true;
};

const openPartial = (clientId: string) => {
  selectedclientId.value = clientId;
  isPartialModalOpen.value = true;
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleStatusChange = (value: string) => {
  emit('update:modelValue', value);
};

const handleFullPaymentProcess = () => {
  emit('refresh');
};

const handlePartialPaymentProcess = () => {
  emit('refresh');
};

const getButtonClass = computed(() => (value: string) => {
  return props.modelValue === value
    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm ring-1 ring-gray-900 dark:ring-gray-100'
    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-sm';
});
</script>
