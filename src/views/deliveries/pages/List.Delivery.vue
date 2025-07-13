<template>
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetailsDelivery v-if="selectedId !== null" :is-open="isOpenDetails" :delivery-data="selectedDelivery" @close="closeDetails" />
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta Delivery?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <ModalUpdateStatus :isOpen="isStatusModalOpen" :status="modalStatus" @confirm="confirmStatusUpdate" @cancel="closeStatusModal" />
    <ModalCancelStatus
      :isOpen="isCancelModalOpen"
      :deliveryId="selectedDeliveryId || ''"
      @close="closeCancelModal"
      @cancelDelivery="handleCancelDelivery"
    />
    <ModalPdfViewer
      :isOpen="isTicketModalOpen"
      :PDFUrl="ticketUrl"
      :PDFBlob="ticketBlob"
      :id="selectedTicketDeliveryId"
      @close="closeTicketModal"
      @download="downloadTicket"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden md:block" v-model="searchQuery" placeholder="Buscar Delivery" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto">
            <div class="flex flex-col gap-2">
              <SelectFilter label="Estado de la Orden" name="status" id="status" :items="deliveryStatusOptions" v-model="selectedStatus">
                <option value="">Todos</option>
              </SelectFilter>
              <SelectFilter label="Servicio" name="serviceId" id="serviceId" :items="serviceOptions" v-model="selectedServiceId">
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
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="deliveries.length"
      @updatePage="updatePage"
      :sort-state="sortConfig"
      @sort="handleSort"
    >
      <TableRow v-for="delivery in paginatedData.items" :key="delivery.id">
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.number }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ formatDateCustom(delivery.date) }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          <span
            :class="{
              'bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded': delivery.client_name_source === 'anonymous',
            }"
          >
            {{ delivery.client_name }}
          </span>
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.courier_full_name }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.service_name }}
        </TableContent>
        <TableContent class="text-black text-right dark:text-white break-words">
          {{ formatToDollars(delivery.amount) }}
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
            <EyeButtonDetails @click="() => openDetails(String(delivery.id))" />
            <EditButton v-if="delivery.status == DeliveryStatus.PENDING" :route="AppRoutesDelivery.edit(delivery.id)" />
            <DownloadButton @click="handleViewTicket(delivery.id)" />
            <TrashButton v-if="delivery.status == DeliveryStatus.PENDING" @click="open(delivery.id)" />
            <Transit v-if="delivery.status == DeliveryStatus.PENDING" @click="handleUpdateStatus(delivery.id, DeliveryStatus.IN_TRANSIT)" />
            <Cancelled v-if="delivery.status == DeliveryStatus.IN_TRANSIT" @click="openCancelModal(delivery.id)" />
            <Delivered
              v-if="delivery.status != DeliveryStatus.DELIVERED && delivery.status == DeliveryStatus.IN_TRANSIT"
              @click="handleUpdateStatus(delivery.id, DeliveryStatus.DELIVERED)"
            />
            <CopyWhatsapp @click="CopyToWhatsapp(delivery.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="delivery in paginatedData.items" :key="delivery.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ delivery.number }}
                </p>
                <p class="text-sm my-1">
                  <span
                    class="dark:text-white"
                    :class="{
                      'bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded': delivery.client_name_source === 'anonymous',
                    }"
                  >
                    {{ delivery.client_name }}
                  </span>
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
                <EyeButtonDetails @click="() => openDetails(String(delivery.id))" />
                <EditButton v-if="delivery.status == DeliveryStatus.PENDING" :route="AppRoutesDelivery.edit(delivery.id)" />
                <DownloadButton @click="handleViewTicket(delivery.id)" />
                <TrashButton v-if="delivery.status == DeliveryStatus.PENDING" @click="open(delivery.id)" />
                <Transit v-if="delivery.status == DeliveryStatus.PENDING" @click="handleUpdateStatus(delivery.id, DeliveryStatus.IN_TRANSIT)" />
                <Cancelled v-if="delivery.status == DeliveryStatus.IN_TRANSIT" @click="openCancelModal(delivery.id)" />
                <Delivered
                  v-if="delivery.status != DeliveryStatus.DELIVERED && delivery.status == DeliveryStatus.IN_TRANSIT"
                  @click="handleUpdateStatus(delivery.id, DeliveryStatus.DELIVERED)"
                />
                <CopyWhatsapp @click="CopyToWhatsapp(delivery.id)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useDebounce, useDeleteWithModal, useModal, usePagination } from '@/composables/';
import { formatDateCustom, formatToDollars } from '@utils';
import {
  Bagde,
  Card,
  DownloadButton,
  EditButton,
  EyeButtonDetails,
  FilterButton,
  LoadingAbsoluteSkeleton,
  LoadingSkeleton,
  ModalConfirmation,
  ModalPdfViewer,
  NewButton,
  SearchForm,
  SideBar,
  TableContent,
  TableDashboard,
  TableRow,
  TrashButton,
} from '@/components/';
import SelectFilter from '@components/forms/SelectFilter.vue';
import { DeliveryStatus, DetailDelivery, getDeliveryStatusLabel, ListDelivery } from '@views/deliveries/models';
import { deleteDeliveryById, getDeliveryById, getDeliveryTicket, getFilteredDeliveries, updateDeliveryStatus } from '@/views/deliveries/services';
import { TABLE_HEADER_DELIVERY } from '@views/deliveries/constants';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { copyToClipboard } from '@views/deliveries/utils';
import Delivered from '@views/deliveries/components/list/button/Delivered.vue';
import Transit from '@views/deliveries/components/list/button/Transit.vue';
import Cancelled from '@views/deliveries/components/list/button/Cancelled.vue';
import CopyWhatsapp from '@views/deliveries/components/list/button/CopyWhatsapp.vue';
import ModalUpdateStatus from '../components/list/ModalUpdateStatus.Delivery.vue';
import ModalCancelStatus from '../components/list/ModalCancelStatus.Delivery.vue';
import ModalDetailsDelivery from '../components/list/ModalDetails.Delivery.vue';
import { getAllServices, ListService } from '@views/services';

const deliveries = ref<ListDelivery[]>([]);
const selectedStatus = ref<DeliveryStatus | undefined>(undefined);
const selectedPaymentStatus = ref<string>('');
const selectedServiceId = ref<string>('');
const selectedPaymentMethod = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const isLoadingDetails = ref(false);
const selectedDelivery = ref<DetailDelivery | null>(null);

const isTicketModalOpen = ref(false);
const ticketUrl = ref<string>('');
const ticketBlob = ref<Blob | null>(null);
const selectedTicketDeliveryId = ref<string>('');

const { isOpen: isOpenDetails, selectedId, open: openModalDetails, close: closeDetails } = useModal<string>();

const openDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedDelivery.value = await getDeliveryById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};

const CopyToWhatsapp = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedDelivery.value = await getDeliveryById(id);
    copyToClipboard(selectedDelivery.value);
  } finally {
    isLoadingDetails.value = false;
  }
};

const sortConfig = ref<{ column: keyof ListDelivery; order: 'asc' | 'desc' } | null>(null);
const searchQuery = ref<string>('');

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListDelivery>();

const modalStatus = ref<DeliveryStatus | undefined>(undefined);
const isStatusModalOpen = ref(false);
const isCancelModalOpen = ref(false);
const selectedDeliveryId = ref<string | undefined>(undefined);

const deliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.IN_TRANSIT, label: 'En Tránsito' },
  { value: DeliveryStatus.DELIVERED, label: 'Entregado' },
  { value: DeliveryStatus.REFUSED, label: 'Cancelado' },
];

watch([selectedStatus, selectedPaymentStatus, selectedServiceId, selectedPaymentMethod, sortConfig, startDate, endDate], () => {
  runSearch();
});

const runSearch = async (page: number = 1) => {
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

    if (selectedServiceId.value) {
      filters.serviceId = selectedServiceId.value;
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
      page: page,
      perPage: paginatedData.value.perPage,
    });

    setPaginatedData(response);
  } finally {
    isLoading.value = false;
  }
};

const handleSort = (config: { column: string; order: 'asc' | 'desc' } | null) => {
  if (config) {
    sortConfig.value = {
      column: config.column as keyof ListDelivery,
      order: config.order,
    };
  } else {
    sortConfig.value = null;
  }
};

const debouncedSearch = useDebounce(runSearch, 500);

const services = ref<ListService[]>([]);

const serviceOptions = computed(() =>
  services.value.map((service) => ({
    label: `${service.name}  (${service.amount})`,
    value: service.id,
  }))
);

onMounted(async () => {
  services.value = await getAllServices();
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

const handleViewTicket = async (deliveryId: string) => {
  try {
    const blob = await getDeliveryTicket(deliveryId);

    if (!blob) {
      console.error('No se pudo obtener el ticket.');
      return;
    }

    const url = window.URL.createObjectURL(blob);

    ticketBlob.value = blob;
    ticketUrl.value = url;
    selectedTicketDeliveryId.value = deliveryId;

    isTicketModalOpen.value = true;
  } catch (error) {
    console.error('Error al obtener el ticket:', error);
  }
};

const downloadTicket = () => {
  if (!ticketBlob.value || !selectedTicketDeliveryId.value) return;

  const filename = `Ticket_${selectedTicketDeliveryId.value}.pdf`;
  const mimeType = 'application/pdf';

  const url = window.URL.createObjectURL(ticketBlob.value);
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

const closeTicketModal = () => {
  isTicketModalOpen.value = false;

  if (ticketUrl.value) {
    window.URL.revokeObjectURL(ticketUrl.value);
    ticketUrl.value = '';
  }

  ticketBlob.value = null;
  selectedTicketDeliveryId.value = '';
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

const handleCancelDelivery = async () => {
  await runSearch();
  closeCancelModal();
};
</script>