<template>
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetailsClient v-if="selectedId !== null" :is-open="isOpenDetails" :client="selectedClient" @close="closeDetails" />
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Cliente?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <ModalReportGeneral
      title="Reporte de deudas general"
      :isOpen="isOpenGeneral"
      :openDate="open_date"
      :closeDate="close_date"
      @close="closeGeneral"
      @submit-filter="handleGeneralReport"
    />
    <ModalReportDetail
      title="Reporte de deudas por cliente"
      :isOpen="isOpenDetail"
      :openDate="open_date"
      :closeDate="close_date"
      @close="closeDetail"
      @submit-filter="handleReportDetail"
      :selected-id="selectedClientId"
      :selectOptions="clientsOptions"
      selectLabel="Cliente"
    />
    <ModalClientSelector
      title="Reporte de deudas no pagadas por cliente"
      :isOpen="isOpenUnpaidReport"
      @close="closeUnpaidReport"
      @submit-selection="handleUnpaidReport"
      :selected-id="null"
      :selectOptions="clientsOptions"
      selectLabel="Cliente"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between flex-col sm:flex-row">
        <div class="md:flex gap-4">
          <SearchForm class="hidden md:block" v-model="searchQuery" placeholder="Buscar Cliente" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto">
            <SelectFilter label="Tipo de cliente" name="type" id="type" :items="clientTypeOptions" v-model="selectedType">
              <option value="">Todos</option>
            </SelectFilter>
            <SelectFilter
              label="Permitir crédito"
              name="allowCredit"
              id="allowCredit"
              :items="[
                { value: 'true', label: 'Sí' },
                { value: 'false', label: 'No' },
              ]"
              v-model="selectedCredit"
            >
              <option value="">Todos</option>
            </SelectFilter>
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Cliente" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <div class="flex gap-6 flex-col sm:flex-row">
          <ReportButton>
            <div class="grid grid-cols-1 dark:bg-gray-700 dark:text-white">
              <button type="button" @click="() => openGeneral('')" class="text-start border-b p-4">Reporte de cuentas General</button>
              <button type="button" @click="handlePendingReport" class="text-start border-b p-4">Reporte de cuentas por cobrar</button>
              <button type="button" @click="() => openUnpaidReport('')" class="text-start border-b p-4">
                Reporte de cuentas por cobrar en cliente
              </button>
              <button type="button" @click="() => openDetail('')" class="text-start border-b p-4">Reporte de cuentas por cliente</button>
            </div>
          </ReportButton>
          <NewButton label="Nuevo Cliente" :URL="AppRoutesClient.new" class="w-full sm:w-auto md:w-auto" />
        </div>
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="[...TABLE_HEADER_CLIENT]"
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="paginatedData.total"
      @updatePage="handlePageChange"
      :sort-state="sortConfig"
      @sort="handleSort"
    >
      <TableRow v-for="client in paginatedData.items" :key="client.id">
        <TableContent class="text-black dark:text-white break-words">
          {{ client.legal_name }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          <Bagde>{{ formatClientType(client.type as ClientType) }}</Bagde>
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300 break-words">
          {{ client.registration_number }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButtonDetails @click="() => openDetails(String(client.id))" />
            <EditButton :route="AppRoutesClient.edit(client.id)" />
            <TrashButton v-if="client.can_delete" @click="open(client.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="client in paginatedData.items" :key="client.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ client.legal_name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ client.registration_number }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ client.type }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButtonDetails @click="() => openDetails(String(client.id))" />
                <EditButton :route="AppRoutesClient.edit(client.id)" />
                <TrashButton v-if="client.can_delete" @click="open(client.id)" />
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
import { useDebounce, useModal, usePagination } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import {
  Bagde,
  Card,
  EditButton,
  EyeButtonDetails,
  FilterButton,
  LoadingAbsoluteSkeleton,
  LoadingSkeleton,
  ModalClientSelector,
  ModalConfirmation,
  ModalReportDetail,
  ModalReportGeneral,
  NewButton,
  ReportButton,
  SearchForm,
  SideBar,
  TableContent,
  TableDashboard,
  TableRow,
  TrashButton,
} from '@/components/';
import SelectFilter from '@components/forms/SelectFilter.vue';
import { ClientType, ClientTypeOptions, DetailClient, formatClientType, ListClient } from '@/views/clients/models';
import { ModalDetailsClient } from '@/views/clients/components/';
import { deleteClientById, getClientById, getFilteredClients } from '@/views/clients/service/';
import { allGetClientsDebtReport, allGetPendingPaidDebtsReport, getClientDebtReport, getClientUnpaidDebtsReport } from '@/views/debts/';
import { TABLE_HEADER_CLIENT } from '@/views/clients/constants/';
import { AppRoutesClient } from '@/views/clients/router';
import { getClientsWithDebt } from '@views/debts';
import { generatePdf } from '@utils';
import { ClientDebt } from '@views/debts/models';

const clientsWithDebts = ref<ClientDebt[]>([]);
const selectedType = ref<string>('');
const selectedCredit = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const isLoadingDetails = ref(false);
const selectedClient = ref<DetailClient | null>(null);

const { isOpen: isOpenDetails, selectedId, open: openModalDetails, close: closeDetails } = useModal<string>();

const openDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedClient.value = await getClientById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};
const sortConfig = ref<{ column: keyof ListClient; order: 'asc' | 'desc' } | null>(null);
const searchQuery = ref<string>('');
const clientTypeOptions = [...ClientTypeOptions];

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListClient>();

watch([selectedType, selectedCredit, sortConfig], () => {
  runSearch();
});

const runSearch = async (page: number = 1) => {
  try {
    isLoading.value = true;
    error.value = null;

    const filters: Record<string, any> = {};

    if (selectedType.value) {
      filters.type = selectedType.value;
    }

    if (selectedCredit.value) {
      filters.allowCredit = selectedCredit.value === 'true';
    }

    const response = await getFilteredClients({
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
      column: config.column as keyof ListClient,
      order: config.order,
    };
  } else {
    sortConfig.value = null;
  }
};

const handlePageChange = async (page: number) => {
  const params = updatePage(page);
  await runSearch(params.page);
};

const debouncedSearch = useDebounce(runSearch, 500);

const clientsOptions = computed(() => {
  console.log('Clientes con deudas:', clientsWithDebts.value);
  return clientsWithDebts.value.map((client) => ({
    label: client.legal_name,
    value: String(client.id),
  }));
});

onMounted(async () => {
  await runSearch(1);
  try {
    clientsWithDebts.value = await getClientsWithDebt();
    console.log('Clientes con deudas cargados:', clientsWithDebts.value.length);
  } catch (error) {
    console.error('Error fetching clients with debts:', error);
  }
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteClientById,
  successMessage: 'Ciente eliminado exitosamente',
  errorMessage: 'Error al eliminar el cliente',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const open_date = ref<string>('');
const close_date = ref<string>('');

const { isOpen: isOpenGeneral, open: openGeneral, close: closeGeneral } = useModal<string>();

const handleGeneralReport = async (start: string, end: string) => {
  isLoadingDetails.value = true;
  try {
    const blob = await allGetClientsDebtReport(start, end);
    const filename = `informe_general_deudas_${start}_${end}.pdf`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};

const { isOpen: isOpenDetail, selectedId: selectedClientId, open: openDetail, close: closeDetail } = useModal<string>();

const { isOpen: isOpenUnpaidReport, open: openUnpaidReport, close: closeUnpaidReport } = useModal<string>();

const handleReportDetail = async (clientId: string, start: string, end: string) => {
  isLoadingDetails.value = true;
  try {
    const blob = await getClientDebtReport(clientId, start, end);
    const filename = `informe_deuda_${clientId}`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};

const handlePendingReport = async () => {
  isLoadingDetails.value = true;
  try {
    const blob = await allGetPendingPaidDebtsReport();
    const filename = `informe_deuda_general`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};

const handleUnpaidReport = async (clientId: string) => {
  isLoadingDetails.value = true;
  try {
    const blob = await getClientUnpaidDebtsReport(clientId);
    const filename = `informe_deudas_no_pagadas_cliente_${clientId}`;
    generatePdf(blob, filename);
  } finally {
    isLoadingDetails.value = false;
  }
};
</script>
