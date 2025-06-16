<template>
  <ConfirmationDeleteModal
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar este Courier?"
    @confirm="handleDeleteConfirmation"
    @cancel="close"
  />
  <SideBar>
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden sm:block" v-model="searchQuery" placeholder="Buscar Repartidor" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Repartidor" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <NewButton label="Nuevo Repartidor" :URL="AppRoutesCourier.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="TABLE_HEADER_COURIER"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="couriers.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="courier in paginatedItems" :key="courier.id">
        <TableContent>{{ courier.firstName }}</TableContent>
        <TableContent>{{ courier.lastName }}</TableContent>
        <TableContent>{{ courier.phone }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesCourier.details(courier.id)" />
            <EditButton :route="AppRoutesCourier.edit(courier.id)" />
            <TrashButton v-if="courier.canDelete" @click="() => open(courier.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="courier in paginatedItems" :key="courier.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ courier.firstName }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ courier.phone }}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesCourier.details(courier.id)" />
                <EditButton :route="AppRoutesCourier.edit(courier.id)" />
                <TrashButton v-if="courier.canDelete" @click="() => open(courier.id)" />
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
  ConfirmationDeleteModal,
  FilterButton,
  LoadingSkeleton,
} from '@/components/';
import { Courier } from '@/views/couriers/';
import { getAllCouriers, deleteCourierById, searchCouriers } from '@/views/couriers/services';
import { TABLE_HEADER_COURIER } from '@/views/couriers/constants/';
import { AppRoutesCourier } from '@views/couriers/router';

const couriers = ref<Courier[]>([]);
const isLoading = ref(false);

const { searchQuery, applySearch } = useSearch<Courier>({
  fetchFn: searchCouriers,
  autoSearch: false,
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    if (searchQuery.value.trim() === '') {
      couriers.value = await getAllCouriers();
    } else {
      couriers.value = await applySearch();
    }
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  isLoading.value = true;
  try {
    couriers.value = await getAllCouriers();
  } finally {
    isLoading.value = false;
  }
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(couriers, 15);

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
</script>
