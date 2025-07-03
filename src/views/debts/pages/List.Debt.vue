<template>
  <SideBar>
    <ClientSelectorModal v-model:open="isOpen" :clients="clients as Client[]" @select="selectedClient = $event" />
    <ClientSelect :selectedClient="selectedClient as Client" :stast="clientsStats" @open="() => open('')" :total-debts-amount="totalDebtAmount" />
    <StatusFilter
      v-if="selectedClient && paginationData.total > 0"
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : undefined"
      :stast="clientsStats"
      v-model="selectedPaymentStatus"
      :options="paymentStatusOptions"
      @refresh="handleRefresh"
    />
    <DeliveryList
      :client-id="selectedClient?.id != null ? String(selectedClient.id) : null"
      :payment-status="selectedPaymentStatus"
      :deliveries="deliveries"
      :pagination-data="paginationData"
      :is-loading="isLoading"
      @refresh="handleRefresh"
      @previous-page="handlePreviousPage"
      @next-page="handleNextPage"
    />
    <LoadingSkeleton v-if="isLoading" />
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { LoadingSkeleton, SideBar } from '@components';
import { useModal } from '@composables';
import ClientSelectorModal from '../components/client/ClientSelectorModal.Debt.vue';
import DeliveryList from '../components/deliveries/DeliveryList.vue';
import ClientSelect from '../components/client/ClientSelect.Debt.vue';
import StatusFilter from '../components/deliveries/FilterDelivery.vue';
import { Delivery } from '@/views/deliveries/';
import { allAmountDebts, getClientDeliveryWithDebtsFilter, getClientStats, getClientsWithDebt } from '@views/debts';
import { Client, Stast } from '@views/clients';

// Interface para los datos de paginación
interface PaginationData {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  from: number;
  to: number;
}

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
const deliveries = ref<Delivery[]>([]);
const isLoading = ref(false);

// Estado para la información de paginación
const paginationData = reactive<PaginationData>({
  current_page: 1,
  per_page: 15,
  total: 0,
  last_page: 1,
  from: 0,
  to: 0,
});

const { isOpen, open } = useModal();

// Función para cargar entregas con paginación
const loadDeliveries = async (clientId: string, paymentStatus: string = selectedPaymentStatus.value, page: number = 1) => {
  try {
    isLoading.value = true;

    const response = await getClientDeliveryWithDebtsFilter(clientId, paymentStatus, page, paginationData.per_page);

    deliveries.value = response.data;

    // Actualizar información de paginación
    paginationData.current_page = response.current_page;
    paginationData.per_page = response.per_page;
    paginationData.total = response.total;
    paginationData.last_page = response.last_page;
    paginationData.from = response.from;
    paginationData.to = response.to;
  } catch (error) {
    console.error('Error loading deliveries:', error);
    deliveries.value = [];
    // Reset pagination data on error
    paginationData.current_page = 1;
    paginationData.total = 0;
    paginationData.last_page = 1;
    paginationData.from = 0;
    paginationData.to = 0;
  } finally {
    isLoading.value = false;
  }
};

// Manejar cambio de página anterior
const handlePreviousPage = () => {
  if (selectedClient.value && paginationData.current_page > 1) {
    loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, paginationData.current_page - 1);
  }
};

// Manejar cambio de página siguiente
const handleNextPage = () => {
  if (selectedClient.value && paginationData.current_page < paginationData.last_page) {
    loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, paginationData.current_page + 1);
  }
};

// Watcher para cliente seleccionado
watch(selectedClient, async (newClient) => {
  if (newClient) {
    try {
      isLoading.value = true;
      clientsStats.value = await getClientStats(newClient.id);
      // Reset pagination to first page when client changes
      paginationData.current_page = 1;
      await loadDeliveries(newClient.id, selectedPaymentStatus.value, 1);
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
    // Reset pagination when no client selected
    paginationData.current_page = 1;
    paginationData.total = 0;
    paginationData.last_page = 1;
    paginationData.from = 0;
    paginationData.to = 0;
  }
});

// Watcher para estado de pago
watch(selectedPaymentStatus, async (newStatus) => {
  if (selectedClient.value) {
    // Reset to first page when filter changes
    paginationData.current_page = 1;
    await loadDeliveries(selectedClient.value.id, newStatus, 1);
  }
});

// Cargar datos iniciales
onMounted(async () => {
  try {
    totalDebtAmount.value = await allAmountDebts();
    clients.value = await getClientsWithDebt();
  } catch (error) {
    console.error('Error loading clients with debt:', error);
    clients.value = [];
  }
});

// Función para refrescar datos
const handleRefresh = async () => {
  if (selectedClient.value) {
    await loadDeliveries(selectedClient.value.id, selectedPaymentStatus.value, paginationData.current_page);
    try {
      totalDebtAmount.value = await allAmountDebts();
      clientsStats.value = await getClientStats(selectedClient.value.id);
    } catch (error) {
      console.error('Error refreshing client stats:', error);
    }
  }
};
</script>