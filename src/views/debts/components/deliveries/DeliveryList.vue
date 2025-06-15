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
      v-for="delivery in paginatedItems"
      :key="delivery.id"
      class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
    >
      <DeliveryCardMobile :delivery="delivery as Delivery" @pay-full="openFull" @pay-partial="openPartial" />
      <DeliveryCardDesktop :delivery="delivery as Delivery" @pay-full="openFull" @pay-partial="openPartial" />
    </div>
    <EmptyStateSelectClient v-if="!clientId" />
    <EmptyStateNoDeliveries v-if="paginatedItems.length === 0 && clientId" :show-action="true" />
  </div>
  <PaginationComponent
    :current-page="currentPage"
    :total-pages="totalPages"
    :items-count="paginatedItems.length"
    item-label="entregas"
    @previous="currentPage--"
    @next="currentPage++"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { Delivery } from '@views/deliveries';
import { usePagination } from '@/composables/';
import PaymentFullModalDebt from '../payment/deliveries/PaymentFullModal.Debt.vue';
import PaymentPartialModalDebt from '../payment/deliveries/PaymentPartialModal.Debt.vue';
import DeliveryCardMobile from './CardMobile.vue';
import DeliveryCardDesktop from './CardDesktop.vue';
import PaginationComponent from './PaginateDelivery.vue';
import EmptyStateSelectClient from './EmptyStateClient.vue';
import EmptyStateNoDeliveries from './EmptyStateDelivery.vue';

const props = defineProps<{
  clientId: string | null;
  paymentStatus: string;
  deliveries: Delivery[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: 'refresh'): void;
  (e: 'create-delivery'): void;
}>();

const deliveriesRef = ref(props.deliveries);
const { currentPage, totalPages, paginatedItems } = usePagination(deliveriesRef, 15);

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
</script>
