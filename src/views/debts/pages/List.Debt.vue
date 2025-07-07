<template>
  <SideBar>
    <ClientSelectorModal v-model:open="isOpen" :clients="clients" @select="selectedClient = $event" />
    <ClientSelect :selectedClient="selectedClient" :stast="clientsStats" @open="() => open('')" :total-debts-amount="totalDebtAmount" />
    <StatusFilter
      v-if="selectedClient && paginatedData.total > 0"
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : undefined"
      :stast="clientsStats"
      v-model="selectedPaymentStatus"
      :options="paymentStatusOptions"
      @refresh="handleRefresh"
    />
    <DeliveryList
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : null"
      :payment-status="selectedPaymentStatus"
      :deliveries="paginatedData.items"
      :pagination-data="{
        current_page: paginatedData.currentPage,
        per_page: paginatedData.perPage,
        total: paginatedData.total,
        last_page: totalPages,
        from: startIndex,
        to: endIndex,
      }"
      :is-loading="isLoading"
      @refresh="handleRefresh"
      @previous-page="handlePreviousPage"
      @next-page="handleNextPage"
    />
    <LoadingSkeleton v-if="isLoading" />
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { LoadingSkeleton, SideBar } from '@components';
import { useModal, usePagination } from '@composables';
import ClientSelectorModal from '../components/client/ClientSelectorModal.Debt.vue';
import DeliveryList from '../components/deliveries/DeliveryList.vue';
import ClientSelect from '../components/client/ClientSelect.Debt.vue';
import StatusFilter from '../components/deliveries/FilterDelivery.vue';
import { Delivery } from '@/views/deliveries/';
import { allAmountDebts, getClientDeliveryWithDebtsFilter, getClientStats, getClientsWithDebt } from '@views/debts';
import { ClientDebt, ClientStats } from '@views/debts/models';

const paymentStatusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'Pago Parcial', value: 'partial_paid' },
  { label: 'Pagado', value: 'paid' },
];

const selectedPaymentStatus = ref('all');
const clients = ref<ClientDebt[]>([]);
const totalDebtAmount = ref<number>(0);
const clientsStats = ref<ClientStats | null>(null);
const selectedClient = ref<ClientDebt | null>(null);
const deliveries = ref<Delivery[]>([]);
const isLoading = ref(false);

const { paginatedData, startIndex, endIndex, totalPages, updatePage, setPaginatedData } = usePagination<Delivery>();

const { isOpen, open } = useModal();

const loadDeliveries = async (clientId: string, paymentStatus: string = selectedPaymentStatus.value, page: number = 1) => {
  try {
    isLoading.value = true;

    const response = await getClientDeliveryWithDebtsFilter({
      client_id: clientId,
      payment_status: paymentStatus !== 'all' ? paymentStatus : undefined,
      page,
      perPage: paginatedData.value.perPage,
    });

    deliveries.value = response.items;

    setPaginatedData(response);
  } catch (error) {
    console.error('Error loading deliveries:', error);
    deliveries.value = [];
    setPaginatedData({
      items: [],
      currentPage: 1,
      perPage: 15,
      total: 0,
    });
  } finally {
    isLoading.value = false;
  }
};

const handlePreviousPage = () => {
  if (selectedClient.value && paginatedData.value.currentPage > 1) {
    const params = updatePage(paginatedData.value.currentPage - 1);
    loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, params.page);
  }
};

const handleNextPage = () => {
  if (selectedClient.value && paginatedData.value.currentPage < totalPages.value) {
    const params = updatePage(paginatedData.value.currentPage + 1);
    loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, params.page);
  }
};

watch(selectedClient, async (newClient) => {
  if (newClient) {
    try {
      isLoading.value = true;
      clientsStats.value = await getClientStats(newClient.id);
      const params = updatePage(1);
      await loadDeliveries(newClient.id, selectedPaymentStatus.value, params.page);
    } catch (error) {
      clientsStats.value = null;
      deliveries.value = [];
      console.error('Error loading client data:', error);
    } finally {
      isLoading.value = false;
    }
  } else {
    deliveries.value = [];
    clientsStats.value = null;
    setPaginatedData({
      items: [],
      currentPage: 1,
      perPage: 15,
      total: 0,
    });
  }
});

watch(selectedPaymentStatus, async (newStatus) => {
  if (selectedClient.value) {
    const params = updatePage(1);
    await loadDeliveries(selectedClient.value.id, newStatus, params.page);
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

const handleRefresh = async () => {
  if (selectedClient.value) {
    await loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, paginatedData.value.currentPage);
    try {
      totalDebtAmount.value = await allAmountDebts();
      clientsStats.value = await getClientStats(selectedClient.value.id);
    } catch (error) {
      console.error('Error refreshing client stats:', error);
    }
  }
};
</script>
