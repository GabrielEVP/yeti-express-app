<template>
  <PaymentFullModalDebt v-if="selectedDelivery" v-model:isOpen="isFullModalOpen" :delivery="selectedDelivery" @proccess="handlePaymentProcess" />
  <PaymentPartialModalDebt
    v-if="selectedDelivery"
    v-model:isOpen="isPartialModalOpen"
    :delivery="selectedDelivery"
    @proccess="handlePaymentProcess"
  />
  <div class="space-y-3 mt-6 px-2 sm:px-0">
    <div
      v-for="delivery in deliveries"
      :key="delivery.id"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      <DeliveryCardMobile :delivery="delivery as DeliveryWithDebt" @pay-full="openFull" @pay-partial="openPartial" />
      <DeliveryCardDesktop :delivery="delivery as DeliveryWithDebt" @pay-full="openFull" @pay-partial="openPartial" />
    </div>
    <EmptyStateSelectClient v-if="!clientId" />
    <EmptyStateNoDeliveries v-if="deliveries.length === 0 && clientId && !isLoading" :show-action="true" />
  </div>
  <PaginationComponent
    v-if="paginationData.total > 0"
    :current-page="paginationData.current_page"
    :total-pages="paginationData.last_page"
    :items-count="paginationData.total"
    item-label="entregas"
    @previous="$emit('previous-page')"
    @next="$emit('next-page')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DeliveryWithDebt } from '@views/debts/models';
import PaymentFullModalDebt from '../payment/deliveries/PaymentFullModal.Debt.vue';
import PaymentPartialModalDebt from '../payment/deliveries/PaymentPartialModal.Debt.vue';
import DeliveryCardMobile from './CardMobile.vue';
import DeliveryCardDesktop from './CardDesktop.vue';
import PaginationComponent from './PaginateDelivery.vue';
import EmptyStateSelectClient from './EmptyStateClient.vue';
import EmptyStateNoDeliveries from './EmptyStateDelivery.vue';

interface PaginationData {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

const props = defineProps<{
  clientId: string | null;
  paymentStatus: string;
  deliveries: DeliveryWithDebt[];
  paginationData: PaginationData;
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'create-delivery'): void;
  (e: 'previous-page'): void;
  (e: 'next-page'): void;
}>();

const selectedDelivery = ref<DeliveryWithDebt>();
const isFullModalOpen = ref(false);
const isPartialModalOpen = ref(false);

const openFull = (delivery: DeliveryWithDebt) => {
  selectedDelivery.value = delivery;
  isFullModalOpen.value = true;
};

const openPartial = (delivery: DeliveryWithDebt) => {
  selectedDelivery.value = delivery;
  isPartialModalOpen.value = true;
};

const handlePaymentProcess = () => {
  emit('refresh');
};
</script>
