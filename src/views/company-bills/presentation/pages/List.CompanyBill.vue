<template>
  <ConfirmationModal
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar esta factura?"
    @confirm="handleDeleteConfirmation"
    @cancel="close"
  />
  <SideBar>
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm
            class="hidden md:block"
            v-model="searchQuery"
            placeholder="Buscar Factura"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto">
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Factura"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nueva Factura"
          :URL="AppRoutesCompanyBill.new"
          class="w-full sm:w-auto md:w-auto"
        />
      </div>
    </Card>
    <TableDashboard
      :headers="TABLE_HEADER_COMPANY_BILL"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="bills.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="bill in paginatedItems" :key="bill.getId()">
        <TableContent>{{ formatDateShort(bill.getDate()) }}</TableContent>
        <TableContent>{{ bill.getName() }}</TableContent>
        <TableContent>{{ formatToDollars(bill.getAmount()) }}</TableContent>
        <TableContent>{{ bill.getFormattedMethod() }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesCompanyBill.details(bill.getId())" />
            <EditButton :route="AppRoutesCompanyBill.edit(bill.getId())" />
            <TrashButton @click="() => open(bill.getId())" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="bill in paginatedItems"
            :key="bill.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold text-gray-900 dark:text-gray-50 break-words">
                  {{ bill.getName() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatDateShort(bill.getDate()) }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatToDollars(bill.getAmount()) }} - {{ bill.getFormattedMethod() }}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesCompanyBill.details(bill.getId())" />
                <EditButton :route="AppRoutesCompanyBill.edit(bill.getId())" />
                <TrashButton @click="() => open(bill.getId())" />
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
import { usePagination, useSearch } from '@/composables/';
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
  EyeButton,
  ConfirmationModal,
  FilterButton,
} from '@/components/';
import { formatDateShort, formatToDollars } from '@/utils/';
import { CompanyBill } from '@/views/company-bills/domain/';
import {
  GetCompanyBillsUseCase,
  DeleteCompanyBillUseCase,
  SearchCompanyBillsUseCase,
} from '@/views/company-bills/use-cases/';
import { CompanyBillRepositoryImpl } from '@/views/company-bills/infrastructure/CompanyBill.RepositoryImpl';
import { TABLE_HEADER_COMPANY_BILL } from '@/views/company-bills/presentation/constants/';
import { AppRoutesCompanyBill } from '@/views/company-bills/presentation/routes';

const repository = new CompanyBillRepositoryImpl();
const getCompanyBillsUseCase = new GetCompanyBillsUseCase(repository);
const deleteCompanyBillUseCase = new DeleteCompanyBillUseCase(repository);
const searchCompanyBillsUseCase = new SearchCompanyBillsUseCase(repository);

const bills = ref<CompanyBill[]>([]);

const { searchQuery, applySearch } = useSearch<CompanyBill>({
  fetchFn: searchCompanyBillsUseCase.execute.bind(searchCompanyBillsUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() === '') {
    bills.value = await getCompanyBillsUseCase.execute();
  } else {
    bills.value = await applySearch();
  }
};

onMounted(async () => {
  bills.value = await getCompanyBillsUseCase.execute();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  bills,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteCompanyBillUseCase.execute.bind(deleteCompanyBillUseCase),
  successMessage: 'Factura eliminada exitosamente',
  errorMessage: 'Error al eliminar la factura',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
