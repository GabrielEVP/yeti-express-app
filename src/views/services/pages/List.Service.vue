<template>
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetailsService v-if="selectedId !== null" :is-open="IsOpenDetails" :service="selectedService" @close="CloseDetails" />
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Servicio?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden sm:block" v-model="searchQuery" placeholder="Buscar Servicio" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Servicio" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <NewButton label="Nuevo Servicio" :URL="AppRoutesService.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="TABLE_HEADER_SERVICE"
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="paginatedData.total"
      @updatePage="handlePageChange"
      @sort="handleSort"
    >
      <TableRow v-for="service in paginatedData.items" :key="service.id">
        <TableContent class="text-black dark:text-white">
          {{ service.name }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.amount) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.total_expense) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.total_earning) }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButtonDetails @click="() => OpenDetails(String(service.id))" />
            <EditButton :route="AppRoutesService.edit(service.id)" />
            <TrashButton v-if="service.can_delete" @click="() => open(service.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="service in paginatedData.items" :key="service.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ service.name }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ formatToDollars(service.amount) }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButtonDetails @click="() => OpenDetails(String(service.id))" />
                <EditButton :route="AppRoutesService.edit(service.id)" />
                <TrashButton v-if="service.can_delete" @click="() => open(service.id)" />
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
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import { formatToDollars } from '@utils';
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
import { ModalDetailsService } from '@/views/services/components/';
import { DetailService, ListService } from '@/views/services/models';
import { deleteServiceById, getFilteredServices, getServiceById } from '@/views/services/services';
import { TABLE_HEADER_SERVICE } from '@/views/services/constants/';
import { AppRoutesService } from '@/views/services/router';

const isLoading = ref(false);
const isLoadingDetails = ref(false);
const selectedService = ref<DetailService | null>(null);
const searchQuery = ref('');

const { isOpen: IsOpenDetails, selectedId, open: openModalDetails, close: CloseDetails } = useModal<string>();

const OpenDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedService.value = await getServiceById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListService>();

const runSearch = async (page: number = 1) => {
  try {
    isLoading.value = true;

    const response = await getFilteredServices({
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
  isLoading.value = true;
  try {
    await runSearch(1);
  } finally {
    isLoading.value = false;
  }
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteServiceById,
  successMessage: 'Servicio eliminado exitosamente',
  errorMessage: 'Error al eliminar el Servicio',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
