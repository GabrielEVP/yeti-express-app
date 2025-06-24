<template>
  <SideBar>
    <ClientSelectorModal v-model:open="isOpen" :clients="clients as Client[]" @select="selectedClient = $event" />
    <ClientSelect :selectedClient="selectedClient as Client" :stast="clientsStats" @open="() => open('')" :total-debts-amount="totalDebtAmount" />
    <StatusFilter
      v-if="selectedClient && deliveries"
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : undefined"
      :stast="clientsStats"
      v-model="selectedPaymentStatus"
      :options="paymentStatusOptions"
      @refresh="handleRefresh"
    />
    <DeliveryList
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : null"
      :payment-status="selectedPaymentStatus"
      :deliveries="filteredDeliveries as Delivery[]"
      :is-loading="isLoading"
      @refresh="handleRefresh"
    />
    <LoadingSkeleton v-if="isLoading" />
  </SideBar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { LoadingSkeleton, SideBar } from '@components';
import { useModal } from '@composables';
import ClientSelectorModal from '../components/client/ClientSelectorModal.Debt.vue';
import DeliveryList from '../components/deliveries/DeliveryList.vue';
import ClientSelect from '../components/client/ClientSelect.Debt.vue';
import StatusFilter from '../components/deliveries/FilterDelivery.vue';
import { Delivery, DeliveryPaymentStatus } from '@/views/deliveries/';
import { allAmountDebts, getClientDeliveryWithDebts, getClientDeliveryWithDebtsFilter, getClientStats, getClientsWithDebt } from '@views/debts';
import { Client, Stast } from '@views/clients';

const paymentStatusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Pago Parcial', value: 'partial_paid' },
  { label: 'Pagado', value: 'paid' },
];

const selectedPaymentStatus = ref('all');
const clients = ref<Client[]>([]);
const totalDebtAmount = ref<number>(0);
const clientsStats = ref<Stast | null>(null);
const selectedClient = ref<Client | null>(null);
const deliveries = ref<Delivery[] | null>([]);
const isLoading = ref(false);

const { isOpen, open } = useModal();

const filteredDeliveries = computed(() => {
  if (selectedPaymentStatus.value === 'all') {
    return deliveries.value;
  }

  return deliveries.value?.filter((delivery) => {
    switch (selectedPaymentStatus.value) {
      case 'pending':
        return delivery.paymentStatus === DeliveryPaymentStatus.PENDING;
      case 'partial_paid':
        return delivery.paymentStatus === DeliveryPaymentStatus.PARTIAL_PAID;
      case 'paid':
        return delivery.paymentStatus === DeliveryPaymentStatus.PAID;
      default:
        return true;
    }
  });
});

watch(selectedClient, async (newClient) => {
  if (newClient) {
    try {
      isLoading.value = true;
      clientsStats.value = await getClientStats(newClient.id);
      await loadDeliveries(newClient.id);
    } catch (error) {
      clientsStats.value = null;
      deliveries.value = [];
    } finally {
      isLoading.value = false;
    }
  } else {
    deliveries.value = [];
    clientsStats.value = null;
  }
});

watch(selectedPaymentStatus, async (newStatus) => {
  if (selectedClient.value) {
    await loadDeliveries(selectedClient.value.id, newStatus);
  }
});

onMounted(async () => {
  try {
    totalDebtAmount.value = await allAmountDebts();
    clients.value = await getClientsWithDebt();
  } catch (error) {
    console.error('Error loading clients with debt:', error);
    clients.value = [];
  }
});

const loadDeliveries = async (clientId: string, paymentStatus: string = selectedPaymentStatus.value) => {
  try {
    isLoading.value = true;

    if (paymentStatus === 'all') {
      deliveries.value = await getClientDeliveryWithDebts(clientId);
    } else {
      deliveries.value = await getClientDeliveryWithDebtsFilter(clientId, paymentStatus);
    }
  } catch (error) {
    console.error('Error loading deliveries:', error);
    deliveries.value = [];
  } finally {
    isLoading.value = false;
  }
};

const handleRefresh = async () => {
  if (selectedClient.value) {
    await loadDeliveries(selectedClient.value.id);
    try {
      totalDebtAmount.value = await allAmountDebts();
      clientsStats.value = await getClientStats(selectedClient.value.id);
    } catch (error) {
      console.error('Error refreshing client stats:', error);
    }
  }
};
</script>
