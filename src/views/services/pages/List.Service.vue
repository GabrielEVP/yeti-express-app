<template>
  <SideBar>
    <ConfirmationDeleteModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Servicio?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
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
      :headers="[...TABLE_HEADER_SERVICE]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="services.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="service in paginatedItems" :key="service.id">
        <TableContent class="text-black dark:text-white">
          {{ service.name }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.amount) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.totalExpense ?? 0) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.totalEarning ?? 0) }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesService.details(service.id)" />
            <EditButton :route="AppRoutesService.edit(service.id)" />
            <TrashButton v-if="service.canDelete" @click="() => open(service.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="service in paginatedItems" :key="service.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
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
                <EyeButton :route="AppRoutesService.details(service.id)" />
                <EditButton :route="AppRoutesService.edit(service.id)" />
                <TrashButton v-if="service.canDelete" @click="() => open(service.id)" />
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
import { usePagination, useSearch, useDebounce } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import { formatToDollars } from '@utils';
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
  ConfirmationDeleteModal,
  FilterButton,
  LoadingSkeleton,
} from '@/components/';
import { Service } from '@/views/services/';
import { getAllServices, deleteServiceById, searchServices } from '@/views/services/';
import { TABLE_HEADER_SERVICE } from '@/views/services/constants/';
import { AppRoutesService } from '@/views/services/router';

const services = ref<Service[]>([]);
const isLoading = ref(false);

const { searchQuery, applySearch } = useSearch<Service>({
  fetchFn: searchServices,
  autoSearch: false,
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    if (searchQuery.value.trim() === '') {
      services.value = await getAllServices();
    } else {
      services.value = await applySearch();
    }
  } finally {
    isLoading.value = false;
  }
};
const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  isLoading.value = true;
  try {
    services.value = await getAllServices();
  } finally {
    isLoading.value = false;
  }
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(services, 15);

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
