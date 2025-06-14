<template>
  <SideBar>
    <ModalDetails v-if="selectedId !== null" :is-open="IsOpenDetails" :company-bill-id="selectedId" @close="CloseDetails" />
    <ConfirmationDeleteModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta gastos?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
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
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="bills.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="bill in paginatedItems" :key="bill.id">
        <TableContent>{{ bill.name }}</TableContent>
        <TableContent>{{ formatDateCustom(bill.date) }}</TableContent>
        <TableContent>{{ formatToDollars(bill.amount) }}</TableContent>
        <TableContent>
          <Bagde>{{ formatPaymentMethod(bill.method) }}</Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <Button class="bg-gray-600 hover:bg-gray-700 text-white transition-colors" @click="() => OpenDetails(String(bill.id))">
              <Eye class="w-4 h-4" />
            </Button>
            <EditButton :route="AppRoutesCompanyBill.edit(bill.id)" />
            <TrashButton @click="() => open(bill.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="bill in paginatedItems" :key="bill.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
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
                <Button class="bg-gray-600 hover:bg-gray-700 text-white transition-colors" @click="() => OpenDetails(String(bill.id))">
                  <Eye class="w-4 h-4" />
                </Button>
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
import { ref, onMounted } from 'vue';
import { usePagination, useSearch, useModal, useDebounce } from '@/composables/';
import { formatDateCustom, formatToDollars } from '@/utils/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import {
  SideBar,
  Card,
  TableContent,
  TableRow,
  TableDashboard,
  SearchForm,
  NewButton,
  TrashButton,
  EditButton,
  ConfirmationDeleteModal,
  FilterButton,
  Button,
  LoadingSkeleton,
  Bagde,
} from '@/components/';
import { ModalDetails } from '@/views/company-bills/components';
import { CompanyBill, formatPaymentMethod } from '@/views/company-bills/';
import { getAllCompanyBills, deleteCompanyBillById, searchCompanyBills } from '@/views/company-bills/services/';
import { TABLE_HEADER_COMPANY_BILL } from '@views/company-bills/constants';
import { AppRoutesCompanyBill } from '@/views/company-bills/router';
import { Eye } from 'lucide-vue-next';

const bills = ref<CompanyBill[]>([]);
const isLoading = ref(false);

const { isOpen: IsOpenDetails, selectedId, open: OpenDetails, close: CloseDetails } = useModal<string>();

const { searchQuery, applySearch } = useSearch<CompanyBill>({
  fetchFn: searchCompanyBills,
  autoSearch: false,
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    if (searchQuery.value.trim() === '') {
      bills.value = await getAllCompanyBills();
    } else {
      bills.value = await applySearch();
    }
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  bills.value = await getAllCompanyBills();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(bills, 15);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteCompanyBillById,
  successMessage: 'Gasto eliminada exitosamente',
  errorMessage: 'Error al eliminar la gastos',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
