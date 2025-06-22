<template>
  <SideBar>
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta Delivery?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <ModalUpdateStatus :isOpen="isStatusModalOpen" :status="modalStatus" @confirm="confirmStatusUpdate" @cancel="closeStatusModal" />
    <ModalCancelStatus :isOpen="isCancelModalOpen" :deliveryId="selectedDeliveryId || ''" @close="closeCancelModal" @cancelDelivery="handleCancelDelivery" />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden md:block" v-model="searchQuery" placeholder="Buscar Delivery" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto">
            <div class="flex flex-col gap-2">
              <SelectFilter label="Estado de la Orden" name="status" id="status" :items="deliveryStatusOptions" v-model="selectedStatus">
                <option value="">Todos</option>
              </SelectFilter>
              <SelectFilter
                label="Estado de Pago"
                name="paymentStatus"
                id="paymentStatus"
                :items="[
                  { value: 'pending', label: 'Pendiente' },
                  { value: 'partial_paid', label: 'Parcialmente pagado' },
                  { value: 'paid', label: 'Pagado' },
                ]"
                v-model="selectedPaymentStatus"
              >
                <option value="">Todos</option>
              </SelectFilter>
              <div class="flex-1">
                <label for="startDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Fecha Inicio </label>
                <input
                  type="date"
                  id="startDate"
                  v-model="startDate"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div class="flex-1">
                <label for="endDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Fecha Fin </label>
                <input
                  type="date"
                  id="endDate"
                  v-model="endDate"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Delivery" @input="debouncedSearch" />
            </div>
          </FilterButton>
        </div>
        <NewButton label="Nueva orden" :URL="AppRoutesDelivery.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="[...TABLE_HEADER_DELIVERY]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="deliveries.length"
      @updatePage="updatePage"
      :sort-state="sortConfig"
      @sort="handleSort"
    >
      <TableRow v-for="delivery in paginatedItems" :key="delivery.id">
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.number }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ formatDateCustom(delivery.date) }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.clientLegalName }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.courierName }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.serviceName }}
        </TableContent>
        <TableContent class="text-black text-right dark:text-white break-words">
          {{ formatToDollars(delivery.amount) }}
        </TableContent>
        <TableContent class="text-black text-center dark:text-white break-words">
          {{ getDeliveryPaymentStatusLabel(delivery.paymentStatus) }}
        </TableContent>
        <TableContent class="text-black text-center dark:text-white break-words">
          <Bagde
            :class="
              delivery.status == DeliveryStatus.PENDING
                ? 'border-blue-500'
                : delivery.status == DeliveryStatus.IN_TRANSIT
                  ? 'border-yellow-500'
                  : delivery.status == DeliveryStatus.DELIVERED
                    ? 'border-green-500'
                    : 'border-red-500'
            "
          >
            {{ getDeliveryStatusLabel(delivery.status) }}
          </Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesDelivery.details(delivery.id)" />
            <EditButton v-if="delivery.status == DeliveryStatus.PENDING" :route="AppRoutesDelivery.edit(delivery.id)" />
            <DownloadButton @click="handleDownload(delivery.id)" />
            <TrashButton v-if="delivery.status == DeliveryStatus.PENDING" @click="open(delivery.id)" />
            <Transit v-if="delivery.status == DeliveryStatus.PENDING" @click="handleUpdateStatus(delivery.id, DeliveryStatus.IN_TRANSIT)" />
            <Cancelled v-if="delivery.status == DeliveryStatus.IN_TRANSIT" @click="openCancelModal(delivery.id)" />
            <Delivered
              v-if="delivery.status != DeliveryStatus.DELIVERED && delivery.status == DeliveryStatus.IN_TRANSIT"
              @click="handleUpdateStatus(delivery.id, DeliveryStatus.DELIVERED)"
            />
            <CopyWhatsapp @click="copyToClipboard(delivery)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="delivery in deliveries" :key="delivery.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ delivery.number }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatDateCustom(delivery.date) }}
                </p>
              </div>
              <Bagde
                :class="
                  delivery.status == DeliveryStatus.PENDING
                    ? 'border-blue-500'
                    : delivery.status == DeliveryStatus.IN_TRANSIT
                      ? 'border-yellow-500'
                      : delivery.status == DeliveryStatus.DELIVERED
                        ? 'border-green-500'
                        : 'border-red-500'
                "
              >
                {{ getDeliveryStatusLabel(delivery.status) }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-1 justify-center">
                <EyeButton :route="AppRoutesDelivery.details(delivery.id)" />
                <EditButton v-if="delivery.status == DeliveryStatus.PENDING" :route="AppRoutesDelivery.edit(delivery.id)" />
                <DownloadButton @click="handleDownload(delivery.id)" />
                <TrashButton v-if="delivery.status == DeliveryStatus.PENDING" @click="open(delivery.id)" />
                <Transit v-if="delivery.status == DeliveryStatus.PENDING" @click="handleUpdateStatus(delivery.id, DeliveryStatus.IN_TRANSIT)" />
                <Cancelled v-if="delivery.status == DeliveryStatus.IN_TRANSIT" @click="openCancelModal(delivery.id)" />
                <Delivered
                  v-if="delivery.status != DeliveryStatus.DELIVERED && delivery.status == DeliveryStatus.IN_TRANSIT"
                  @click="handleUpdateStatus(delivery.id, DeliveryStatus.DELIVERED)"
                />
                <CopyWhatsapp @click="copyToClipboard(delivery)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePagination, useSearch, useDebounce, useDeleteWithModal } from '@/composables/';
import { formatDateCustom, formatToDollars } from '@utils';
import {
  SideBar,
  Card,
  Bagde,
  TableContent,
  TableRow,
  TableDashboard,
  SearchForm,
  NewButton,
  TrashButton,
  EditButton,
  EyeButton,
  DownloadButton,
  ModalConfirmation,
  FilterButton,
  LoadingSkeleton,
} from '@/components/';
import SelectFilter from '@components/forms/SelectFilter.vue';
import { Delivery, getDeliveryPaymentStatusLabel, getDeliveryStatusLabel } from '@views/deliveries/models';
import { DeliveryStatus } from '@views/deliveries/models';
import {
  deleteDeliveryById,
  searchDeliveries,
  getFilteredDeliveries,
  updateDeliveryStatus,
  getDeliveryTicket,
  CancelDelivery,
} from '@/views/deliveries/services';
import { TABLE_HEADER_DELIVERY } from '@views/deliveries/constants';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { copyToClipboard } from '@views/deliveries/utils'

import Delivered from '../components/button/Delivered.vue';
import Transit from '../components/button/Transit.vue';
import Cancelled from '../components/button/Cancelled.vue';
import CopyWhatsapp from '../components/button/CopyWhatsapp.vue';
import ModalUpdateStatus from '../components/ModalUpdateStatus.Delivery.vue';
import ModalCancelStatus from '../components/ModalCancelStatus.Delivery.vue';

const deliveries = ref<Delivery[]>([]);
const selectedStatus = ref<DeliveryStatus | undefined>(undefined);
const selectedPaymentStatus = ref<string>('');
const selectedPaymentMethod = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const sortConfig = ref<{ column: keyof Delivery; order: 'asc' | 'desc' } | null>(null);

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(deliveries, 15);

const modalStatus = ref<DeliveryStatus | undefined>(undefined);
const isStatusModalOpen = ref(false);
const isCancelModalOpen = ref(false);
const selectedDeliveryId = ref<string | undefined>(undefined);

const deliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.IN_TRANSIT, label: 'En Tránsito' },
  { value: DeliveryStatus.DELIVERED, label: 'Entregado' },
  { value: DeliveryStatus.REFUSED, label: 'Rechazado' },
];

const { searchQuery } = useSearch<Delivery>({
  fetchFn: searchDeliveries,
  autoSearch: false,
});

watch([selectedStatus, selectedPaymentStatus, selectedPaymentMethod, sortConfig, startDate, endDate], () => {
  currentPage.value = 1;
  runSearch();
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const filters: Record<string, any> = {};

    if (selectedStatus.value) {
      filters.status = selectedStatus.value;
    }

    if (selectedPaymentStatus.value) {
      filters.paymentStatus = selectedPaymentStatus.value;
    }

    if (selectedPaymentMethod.value) {
      filters.paymentMethod = selectedPaymentMethod.value;
    }

    if (startDate.value) {
      filters.startDate = startDate.value;
    }

    if (endDate.value) {
      filters.endDate = endDate.value;
    }

    const response = await getFilteredDeliveries({
      search: searchQuery.value.trim(),
      filters,
      sortBy: sortConfig.value?.column,
      sortDirection: sortConfig.value?.order,
    });
    deliveries.value = response;
  } finally {
    isLoading.value = false;
  }
};

const handleSort = (config: { column: string; order: 'asc' | 'desc' } | null) => {
  if (config) {
    sortConfig.value = {
      column: config.column as keyof Delivery,
      order: config.order,
    };
  } else {
    sortConfig.value = null;
  }
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  await runSearch();
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteDeliveryById,
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const handleDownload = async (deliveryId: string) => {
  const blob = await getDeliveryTicket(deliveryId);
  const filename = `Ticket_${deliveryId}.pdf`;
  const mimeType = 'application/pdf';

  if (!blob) {
    console.error('No se proporcionó un Blob para descargar.');
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.type = mimeType;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
};

const openStatusModal = (id: string, status: DeliveryStatus) => {
  selectedDeliveryId.value = id;
  modalStatus.value = status;
  isStatusModalOpen.value = true;
};

const closeStatusModal = () => {
  isStatusModalOpen.value = false;
  modalStatus.value = undefined;
  selectedDeliveryId.value = undefined;
};

const confirmStatusUpdate = async () => {
  if (selectedDeliveryId.value && modalStatus.value) {
    await updateDeliveryStatus(selectedDeliveryId.value, modalStatus.value);
    await runSearch();
    closeStatusModal();
  }
};

async function handleUpdateStatus(id: string, status: DeliveryStatus) {
  openStatusModal(id, status);
}

const openCancelModal = (id: string) => {
  selectedDeliveryId.value = id;
  isCancelModalOpen.value = true;
};

const closeCancelModal = () => {
  isCancelModalOpen.value = false;
  selectedDeliveryId.value = undefined;
};

const handleCancelDelivery = async (cancelData: { cancellationNotes: string, deliveryId: string }) => {
  await runSearch();
  closeCancelModal();
};

</script>
