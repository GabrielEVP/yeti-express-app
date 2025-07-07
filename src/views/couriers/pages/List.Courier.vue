<template>
  <ModalConfirmation :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Courier?" @confirm="handleDeleteConfirmation" @close="close" />
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetailsCourier v-if="selectedId !== null" :is-open="isOpenDetails" :courier="selectedCourier" @close="closeDetails" />
    <ModalReportGeneral
      title="Reporte de entregas general"
      :isOpen="isOpenGeneral"
      :openDate="open_date"
      :closeDate="close_date"
      @close="closeGeneral"
      @submit-filter="handleGeneralReport"
    />
    <ModalReportGeneral
      title="Reporte de entregas general"
      :isOpen="isOpenGeneral"
      :openDate="open_date"
      :closeDate="close_date"
      @close="closeGeneral"
      @submit-filter="handleGeneralReport"
    />
    <ModalReportDetail
      title="Reporte de entregas por repartidor"
      :isOpen="isOpenDetail"
      :openDate="open_date"
      :closeDate="close_date"
      @close="closeDetail"
      @submit-filter="handleReportDetail"
      :selected-id="selectedCourierId"
      :selectOptions="courierOptions"
      selectLabel="Cliente"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between flex-col sm:flex-row">
        <div class="md:flex gap-4">
          <SearchForm class="hidden sm:block" v-model="searchQuery" placeholder="Buscar Repartidor" @input="debouncedSearch" />
          <FilterButton class="sm:hidden w-full sm:w-auto">
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Repartidor" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <div class="flex gap-6 flex-col sm:flex-row">
          <ReportButton>
            <div class="grid grid-cols-1 dark:bg-gray-700">
              <button type="button" @click="() => openGeneral('')" class="text-start border-b p-4">
                <Text>Reporte de entregas General</Text>
              </button>
              <button type="button" @click="() => openDetail('')" class="text-start border-b p-4">
                <Text>Reporte de cuentas por repartidor</Text>
              </button>
            </div>
          </ReportButton>
          <NewButton label="Nuevo Repartidor" :URL="AppRoutesCourier.new" class="w-full sm:w-auto md:w-auto" />
        </div>
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="TABLE_HEADER_COURIER"
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="paginatedData.total"
      @updatePage="handlePageChange"
    >
      <TableRow v-for="courier in paginatedData.items" :key="courier.id">
        <TableContent>{{ courier.first_name }}</TableContent>
        <TableContent>{{ courier.last_name }}</TableContent>
        <TableContent>{{ courier.phone }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButtonDetails @click="() => openDetails(String(courier.id))" />
            <EditButton :route="AppRoutesCourier.edit(courier.id)" />
            <TrashButton v-if="courier.can_delete" @click="() => open(courier.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="courier in paginatedData.items" :key="courier.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ courier.first_name }} {{ courier.last_name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ courier.phone }}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButtonDetails @click="() => openDetails(String(courier.id))" />
                <EditButton :route="AppRoutesCourier.edit(courier.id)" />
                <TrashButton v-if="courier.can_delete" @click="() => open(courier.id)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useDebounce, useModal, usePagination } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import {
  Card,
  EditButton,
  EyeButtonDetails,
  FilterButton,
  LoadingAbsoluteSkeleton,
  LoadingSkeleton,
  ModalConfirmation,
  ModalReportGeneral,
  NewButton,
  ReportButton,
  SearchForm,
  SideBar,
  TableContent,
  TableDashboard,
  TableRow,
  Text,
  TrashButton,
} from '@/components/';
import { ModalDetailsCourier } from '@/views/couriers/components/';
import { DetailCourier, ListCourier } from '@/views/couriers/';
import {
  deleteCourierById,
  getAllCouriersDeliveriesReport,
  getCourierById,
  getCourierDeliveryReport,
  getFilteredCouriers,
} from '@/views/couriers/services';
import { TABLE_HEADER_COURIER } from '@/views/couriers/constants/';
import { AppRoutesCourier } from '@views/couriers/router';
import { ModalReportDetail } from '@components';
import { generatePdf } from '@utils';

const isLoading = ref(false);
const error = ref<string | null>(null);
const isLoadingDetails = ref(false);
const selectedCourier = ref<DetailCourier | null>(null);
const searchQuery = ref<string>('');

const { isOpen: isOpenDetails, selectedId, open: openModalDetails, close: closeDetails } = useModal<string>();

const openDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedCourier.value = await getCourierById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListCourier>();

const runSearch = async (page: number = 1) => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await getFilteredCouriers({
      search: searchQuery.value.trim(),
      page: page,
      perPage: paginatedData.value.perPage,
    });

    setPaginatedData(response);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = async (page: number) => {
  const params = updatePage(page);
  await runSearch(params.page);
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  await runSearch(1);
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteCourierById,
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const open_date = ref<string>('');
const close_date = ref<string>('');

const { isOpen: isOpenGeneral, open: openGeneral, close: closeGeneral } = useModal();

const handleGeneralReport = async (start: string, end: string) => {
  isLoadingDetails.value = true;
  try {
    const blob = await getAllCouriersDeliveriesReport(start, end);
    const filename = `informe_general_entregas_${start}_${end}.pdf`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};

const handleReportDetail = async (courierId: string, start: string, end: string) => {
  isLoadingDetails.value = true;
  try {
    const blob = await getCourierDeliveryReport(courierId, start, end);
    const filename = `informe_entregas_${courierId}`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};

const courierOptions = computed(() => {
  return paginatedData.value.items.map((courier: ListCourier) => ({
    label: courier.first_name + ' ' + courier.last_name,
    value: courier.id,
  }));
});

const { isOpen: isOpenDetail, selectedId: selectedCourierId, open: openDetail, close: closeDetail } = useModal();
</script>
