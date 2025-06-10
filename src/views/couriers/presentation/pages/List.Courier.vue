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
          <SearchForm
            class="hidden sm:block"
            v-model="searchQuery"
            placeholder="Buscar Repartidor"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Repartidor"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nuevo Repartidor"
          :URL="AppRoutesCourier.new"
          class="w-full sm:w-auto md:w-auto"
        />
      </div>
    </Card>
    <TableDashboard
      :headers="TABLE_HEADER_COURIER"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="couriers.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="courier in paginatedItems" :key="courier.getId()">
        <TableContent>{{ courier.getFirstName() }}</TableContent>
        <TableContent>{{ courier.getLastName() }}</TableContent>
        <TableContent>{{ courier.getPhone() }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesCourier.details(courier.getId())" />
            <EditButton :route="AppRoutesCourier.edit(courier.getId())" />
            <TrashButton @click="() => open(courier.getId())" />
            <DownloadButton @click="() => handleReport(courier as Courier)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="courier in paginatedItems"
            :key="courier.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ courier.getFullName() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ courier.getPhone() }}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesCourier.details(courier.getId())" />
                <EditButton :route="AppRoutesCourier.edit(courier.getId())" />
                <TrashButton @click="() => open(courier.getId())" />
                <DownloadButton @click="() => handleReport(courier as Courier)" />
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
  ConfirmationDeleteModal,
  FilterButton,
  DownloadButton,
} from '@/components/';
import { Courier } from '@/views/couriers/domain/';
import {
  GetCouriersUseCase,
  DeleteCourierUseCase,
  SearchCouriersUseCase,
  GetCourierDeliveriesReportUseCase,
} from '@/views/couriers/use-cases/';
import { CourierRepositoryImpl } from '@/views/couriers/infrastructure/Courier.RepositoryImpl';
import { TABLE_HEADER_COURIER } from '@/views/couriers/presentation/constants/';
import { AppRoutesCourier } from '@/views/couriers/presentation/routes';

const repository = new CourierRepositoryImpl();
const getCouriersUseCase = new GetCouriersUseCase(repository);
const deleteCourierUseCase = new DeleteCourierUseCase(repository);
const searchCouriersUseCase = new SearchCouriersUseCase(repository);
const getCourierDeliveriesReportUseCase = new GetCourierDeliveriesReportUseCase(repository);

const couriers = ref<Courier[]>([]);

const { searchQuery, applySearch } = useSearch<Courier>({
  fetchFn: searchCouriersUseCase.execute.bind(searchCouriersUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() === '') {
    couriers.value = await getCouriersUseCase.execute();
  } else {
    couriers.value = await applySearch();
  }
};

onMounted(async () => {
  couriers.value = await getCouriersUseCase.execute();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  couriers,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteCourierUseCase.execute.bind(deleteCourierUseCase),
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const handleReport = async (courier: Courier) => {
  try {
    const blob = await getCourierDeliveriesReportUseCase.execute(courier.getId());
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {}
};
</script>
