<template>
  <SideBar>
    <ConfirmationDeleteModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta Delivery?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <ModalUpdateStatus
      :isOpen="isStatusModalOpen"
      :status="modalStatus"
      @confirm="confirmStatusUpdate"
      @cancel="closeStatusModal"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm
            class="hidden md:block"
            v-model="searchQuery"
            placeholder="Buscar Delivery"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto">
            <div class="flex flex-col gap-2">
              <SelectFilter
                label="Estado de la Orden"
                name="status"
                id="status"
                :items="deliveryStatusOptions"
                v-model="selectedStatus"
              >
                <option value="">Todos</option>
              </SelectFilter>
              <SelectFilter
                label="Estado de Pago"
                name="paymentStatus"
                id="paymentStatus"
                :items="[
                  { value: 'PAID', label: 'Pagado' },
                  { value: 'PENDING', label: 'Pendiente' },
                  { value: 'PARTIAL', label: 'Pago Parcial' },
                ]"
                v-model="selectedPaymentStatus"
              >
                <option value="">Todos</option>
              </SelectFilter>
              <div class="flex-1">
                <label
                  for="startDate"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  id="startDate"
                  v-model="startDate"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div class="flex-1">
                <label
                  for="endDate"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Fecha Fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  v-model="endDate"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <SearchForm
                class="sm:hidden"
                v-model="searchQuery"
                placeholder="Buscar Delivery"
                @input="runSearch"
              />
            </div>
          </FilterButton>
        </div>
        <NewButton
          label="Nueva orden"
          :URL="AppRoutesDelivery.new"
          class="w-full sm:w-auto md:w-auto"
        />
      </div>
    </Card>
    <div
      v-if="error"
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      {{ error }}
    </div>
    <TableDashboard
      v-if="!isLoading"
      :headers="[...TABLE_HEADER_DELIVERY]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="totalItems"
      :sortState="sortConfig"
      @updatePage="updatePage"
      @sort="handleSort"
    >
      <TableRow v-for="delivery in deliveries" :key="delivery.getId()">
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getNumber() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ formatDateCustom(delivery.getDate()) }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getClient()?.getLegalName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getCourier()?.getFullName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getService().getName() }}
        </TableContent>
        <TableContent class="text-black text-right dark:text-white break-words">
          {{ formatToDollars(delivery.getAmount()) }}
        </TableContent>
        <TableContent class="text-black text-center dark:text-white break-words">
          <Bagde
            :class="
              delivery.getStatus() == DeliveryStatus.PENDING
                ? 'border-blue-500'
                : delivery.getStatus() == DeliveryStatus.IN_TRANSIT
                  ? 'border-yellow-500'
                  : delivery.getStatus() == DeliveryStatus.DELIVERED
                    ? 'border-green-500'
                    : 'border-red-500'
            "
          >
            {{ delivery.getStatusToFormat() }}
          </Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
            <EditButton
              v-if="delivery.getStatus() == DeliveryStatus.PENDING"
              :route="AppRoutesDelivery.edit(delivery.getId())"
            />
            <DownloadButton @click="handleDownload(delivery.getId())" />
            <TrashButton
              v-if="delivery.getStatus() == DeliveryStatus.PENDING"
              @click="open(delivery.getId())"
            />
            <Transit
              v-if="
                delivery.getStatus() == DeliveryStatus.PENDING &&
                delivery.getStatus() != DeliveryStatus.DELIVERED
              "
              @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.IN_TRANSIT)"
            />
            <Cancelled
              v-if="
                delivery.getStatus() == DeliveryStatus.IN_TRANSIT &&
                delivery.getStatus() != DeliveryStatus.DELIVERED
              "
              @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.REFUSED)"
            />
            <Delivered
              v-if="
                delivery.getStatus() != DeliveryStatus.DELIVERED &&
                delivery.getStatus() == DeliveryStatus.IN_TRANSIT
              "
              @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.DELIVERED)"
            />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="delivery in deliveries"
            :key="delivery.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ delivery.getNumber() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatDateCustom(delivery.getDate()) }}
                </p>
              </div>
              <Bagde
                :class="
                  delivery.getStatus() == DeliveryStatus.PENDING
                    ? 'border-blue-500'
                    : delivery.getStatus() == DeliveryStatus.IN_TRANSIT
                      ? 'border-yellow-500'
                      : delivery.getStatus() == DeliveryStatus.DELIVERED
                        ? 'border-green-500'
                        : 'border-red-500'
                "
              >
                {{ delivery.getStatusToFormat() }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-1 justify-center">
                <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
                <EditButton
                  v-if="delivery.getStatus() == DeliveryStatus.PENDING"
                  :route="AppRoutesDelivery.edit(delivery.getId())"
                />
                <DownloadButton @click="handleDownload(delivery.getId())" />
                <TrashButton
                  v-if="delivery.getStatus() == DeliveryStatus.PENDING"
                  @click="open(delivery.getId())"
                />
                <Transit
                  v-if="
                    delivery.getStatus() == DeliveryStatus.PENDING &&
                    delivery.getStatus() != DeliveryStatus.DELIVERED
                  "
                  @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.IN_TRANSIT)"
                />
                <Cancelled
                  v-if="
                    delivery.getStatus() == DeliveryStatus.IN_TRANSIT &&
                    delivery.getStatus() != DeliveryStatus.DELIVERED
                  "
                  @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.REFUSED)"
                />
                <Delivered
                  v-if="
                    delivery.getStatus() != DeliveryStatus.DELIVERED &&
                    delivery.getStatus() == DeliveryStatus.IN_TRANSIT
                  "
                  @click="handleUpdateStatus(delivery.getId(), DeliveryStatus.DELIVERED)"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
    <div v-else class="flex justify-center items-center p-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"
      ></div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePagination, useSearch } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
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
  ConfirmationDeleteModal,
  FilterButton,
} from '@/components/';
import SelectFilter from '@components/forms/SelectFilter.vue';
import { Delivery, DeliveryStatus } from '@/views/deliveries/domain/';
import { DeleteDeliveryUseCase, SearchDeliveriesUseCase } from '@/views/deliveries/use-cases/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';
import { TABLE_HEADER_DELIVERY } from '@/views/deliveries/presentation/constants/';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes';
import { UpdateDeliveryStatusUseCase } from '@/views/deliveries/use-cases/UpdateDeliveryStatusUseCase';
import { GetDeliveryTicketPDFUseCase } from '@/views/deliveries/use-cases/Delivery.GetTicketPdfUseCase';
import Delivered from '../components/button/Delivered.vue';
import Transit from '../components/button/Transit.vue';
import Cancelled from '../components/button/Cancelled.vue';
import ModalUpdateStatus from '../components/ModalUpdateStatus.Delivery.vue';

const repository = new DeliveryRepositoryImpl();
const deleteDeliveryUseCase = new DeleteDeliveryUseCase(repository);
const searchDeliveriesUseCase = new SearchDeliveriesUseCase(repository);
const updateDeliveryStatus = new UpdateDeliveryStatusUseCase(repository);
const getTicketPDFUseCase = new GetDeliveryTicketPDFUseCase(repository);

const deliveries = ref<Delivery[]>([]);
const selectedStatus = ref<DeliveryStatus | undefined>(undefined);
const selectedPaymentStatus = ref<string>('');
const selectedPaymentMethod = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const sortConfig = ref<{ column: keyof Delivery; order: 'asc' | 'desc' } | null>(null);
const currentPage = ref(1);
const totalItems = ref(0);
const totalPages = ref(1);
const startIndex = ref(0);
const endIndex = ref(0);

// Separate status for modal
const modalStatus = ref<DeliveryStatus | undefined>(undefined);
const isStatusModalOpen = ref(false);
const selectedDeliveryId = ref<string | undefined>(undefined);

const deliveryStatusOptions = [
  { value: DeliveryStatus.PENDING, label: 'Pendiente' },
  { value: DeliveryStatus.IN_TRANSIT, label: 'En Tránsito' },
  { value: DeliveryStatus.DELIVERED, label: 'Entregado' },
  { value: DeliveryStatus.REFUSED, label: 'Rechazado' },
];

const { searchQuery } = useSearch<Delivery>({
  fetchFn: searchDeliveriesUseCase.execute.bind(searchDeliveriesUseCase),
  autoSearch: false,
});

watch(
  [selectedStatus, selectedPaymentStatus, selectedPaymentMethod, sortConfig, startDate, endDate],
  () => {
    currentPage.value = 1;
    runSearch();
  }
);

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

    const response = await repository.getFilterAll({
      search: searchQuery.value.trim(),
      filters,
      page: currentPage.value,
      perPage: 15,
      sortBy: sortConfig.value?.column,
      sortDirection: sortConfig.value?.order,
    });

    deliveries.value = response.data;
    totalItems.value = response.total;
    totalPages.value = Math.ceil(response.total / 15);
    startIndex.value = (currentPage.value - 1) * 15;
    endIndex.value = Math.min(startIndex.value + 15, response.total);
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar los deliveries';
    deliveries.value = [];
    totalItems.value = 0;
    totalPages.value = 1;
    startIndex.value = 0;
    endIndex.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const updatePage = (page: number) => {
  currentPage.value = page;
  runSearch();
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

onMounted(async () => {
  await runSearch();
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteDeliveryUseCase.execute.bind(deleteDeliveryUseCase),
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
  try {
    const blob = await getTicketPDFUseCase.execute(deliveryId);
    if (blob.type === 'application/json') {
      // Si recibimos JSON, probablemente es un error
      const reader = new FileReader();
      reader.onload = () => {
        const error = JSON.parse(reader.result as string);
        console.error('Error from server:', error);
      };
      reader.readAsText(blob);
      return;
    }
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Clean up the URL after a short delay to ensure the PDF loads
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);
  } catch (error) {
    console.error('Error opening ticket:', error);
  }
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
    await updateDeliveryStatus.execute(selectedDeliveryId.value, modalStatus.value);
    await runSearch();
    closeStatusModal();
  }
};

async function handleUpdateStatus(id: string, status: DeliveryStatus) {
  openStatusModal(id, status);
}
</script>
