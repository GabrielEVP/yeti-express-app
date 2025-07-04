<template>
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetails v-if="selectedId !== null" :is-open="IsOpenDetails" :bill-data="selectedBill" @close="CloseDetails" />
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta gastos?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden sm:block" v-model="searchQuery" placeholder="Buscar Gastos" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Gasto" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <NewButton label="Nuevo Gasto" :URL="AppRoutesCompanyBill.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="TABLE_HEADER_COMPANY_BILL"
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="paginatedData.total"
      @updatePage="handlePageChange"
    >
      <TableRow v-for="bill in paginatedData.items" :key="bill.id">
        <TableContent>{{ bill.name }}</TableContent>
        <TableContent>{{ formatDateCustom(bill.date) }}</TableContent>
        <TableContent>{{ formatToDollars(bill.amount) }}</TableContent>
        <TableContent>
          <Bagde>{{ formatPaymentMethod(bill.method) }}</Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButtonDetails @click="() => OpenDetails(String(bill.id))" />
            <EditButton :route="AppRoutesCompanyBill.edit(bill.id)" />
            <TrashButton @click="() => open(bill.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="bill in paginatedData.items" :key="bill.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold text-gray-900 dark:text-gray-50 break-words">
                  {{ bill.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatDateCustom(bill.date) }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">{{ formatToDollars(bill.amount) }} - {{ bill.method }}</p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButtonDetails @click="() => OpenDetails(String(bill.id))" />
                <EditButton :route="AppRoutesCompanyBill.edit(bill.id)" />
                <TrashButton @click="() => open(bill.id)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDebounce, useModal, usePagination } from '@/composables/';
import { formatDateCustom, formatToDollars } from '@/utils/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import {
  Bagde,
  Card,
  EditButton,
  EyeButtonDetails,
  FilterButton,
  LoadingAbsoluteSkeleton,
  LoadingSkeleton,
  ModalConfirmation,
  NewButton,
  SearchForm,
  SideBar,
  TableContent,
  TableDashboard,
  TableRow,
  TrashButton,
} from '@/components/';
import { ModalDetails } from '@/views/company-bills/components';
import { DetailCompanyBill, formatPaymentMethod, getCompanyBillById, ListCompanyBill } from '@/views/company-bills/';
import { deleteCompanyBillById, getFilteredCompanyBills } from '@/views/company-bills/services/';
import { TABLE_HEADER_COMPANY_BILL } from '@views/company-bills/constants';
import { AppRoutesCompanyBill } from '@/views/company-bills/router';

const { isOpen: IsOpenDetails, selectedId, open: openModalDetails, close: CloseDetails } = useModal<string>();

const isLoadingDetails = ref(false);
const selectedBill = ref<DetailCompanyBill | null>(null);

const OpenDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedBill.value = await getCompanyBillById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListCompanyBill>();

const isLoading = ref(false);
const searchQuery = ref<string>('');

const runSearch = async (page: number = 1) => {
  try {
    isLoading.value = true;

    const response = await getFilteredCompanyBills({
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
  deleteFn: deleteCompanyBillById,
  successMessage: 'Gasto eliminado exitosamente',
  errorMessage: 'Error al eliminar el gasto',
  onAfterDelete: async () => {
    await runSearch(paginatedData.value.currentPage);
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
