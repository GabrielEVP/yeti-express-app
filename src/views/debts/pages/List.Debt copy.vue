<template>
  <SideBar>
    <LoadingSkeleton v-if="isLoading" />
    <ClientSelectorModal v-model:open="isOpen" :clients="clients as Client[]" @select="selectedClient = $event" />
    <ClientSelect :selectedClient="selectedClient as Client" @open="open" />
    <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 rounded-lg shadow-sm mt-4">
      <div class="p-4 sm:p-6">
        <div class="flex flex-col gap-4">
          <div class="overflow-x-auto">
            <div class="flex gap-1 min-w-max sm:min-w-0">
              <button
                v-for="status in paymentStatusOptions"
                :key="status.value"
                @click="selectedPaymentStatus = status.value"
                class="px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap"
                :class="
                  selectedPaymentStatus === status.value
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                "
              >
                {{ status.label }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeliveryList
      :clientId="selectedClient?.getId() ?? null"
      :paymentStatus="selectedPaymentStatus"
      :deliveries="filteredDeliveries"
      :isLoading="isLoading"
      @refresh="handleRefresh"
    />
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { SideBar, LoadingSkeleton } from '@components';
import { useModal } from '@composables';

import { Delivery, DeliveryPaymentStatus } from '@/views/deliveries/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';
import { LoadDeliveriesWithDebtByClientUseCase } from '@/views/deliveries/use-cases/';
import ClientSelectorModal from '../components/client/ClientSelectorModal.Debt.vue';
import DeliveryList from '../components/deliveries/DeliveryList.vue';
import ClientSelect from '../components/client/ClientSelect.Debt.vue';

const paymentStatusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Pago Parcial', value: 'partially-paid' },
  { label: 'Pagado', value: 'paid' },
];

const repository = new ClientRepositoryImpl();
const deliveryRepository = new DeliveryRepositoryImpl();
const getClientsUseCase = new GetClientsUseCase(repository);
const loadDeliveriesWithDebtByClientUseCase = new LoadDeliveriesWithDebtByClientUseCase(deliveryRepository);

const selectedPaymentStatus = ref('all');

const clients = ref<Client[]>([]);
const selectedClient = ref<Client | null>(null);
const allDeliveries = ref<Delivery[]>([]);
const isLoading = ref(false);

const filteredDeliveries = computed(() => {
  if (!selectedClient.value) return [];

  let deliveries = allDeliveries.value;

  switch (selectedPaymentStatus.value) {
    case 'pending':
      deliveries = deliveries.filter((d) => d.getPaymentStatus() === DeliveryPaymentStatus.PENDING);
      break;
    case 'partially-paid':
      deliveries = deliveries.filter((d) => d.getPaymentStatus() === DeliveryPaymentStatus.PARTIALLY_PAID);
      break;
    case 'paid':
      deliveries = deliveries.filter((d) => d.getPaymentStatus() === DeliveryPaymentStatus.PAID);
      break;
  }

  return deliveries;
});

const loadDeliveries = async (clientId: string) => {
  try {
    isLoading.value = true;
    allDeliveries.value = await loadDeliveriesWithDebtByClientUseCase.execute(clientId);
  } catch (error) {
    console.error('Error loading deliveries:', error);
    allDeliveries.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleRefresh = async () => {
  if (selectedClient.value) {
    await loadDeliveries(selectedClient.value.getId());
  }
};

watch(selectedClient, async (newClient) => {
  if (newClient) {
    await loadDeliveries(newClient.getId());
  } else {
    allDeliveries.value = [];
  }
});

onMounted(async () => {
  clients.value = await getClientsUseCase.execute();
});

const { isOpen, open } = useModal();
</script>
