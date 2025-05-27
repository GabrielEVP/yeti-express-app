<template>
  <ConfirmationModal
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar este Courier?"
    @confirm="handleDeleteConfirmation"
    @cancel="close"
  />
  <SideBar>
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar Courier" @input="runSearch" />
        </div>
        <NewButton label="Nuevo Repartidor" :URL="AppRoutesCourier.new" />
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
        <TableContent>{{ courier.getFullName() }}</TableContent>
        <TableContent>{{ courier.getPhone() }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesCourier.details(courier.getId())" />
            <EditButton :route="AppRoutesCourier.edit(courier.getId())" />
            <TrashButton @click="() => open(courier.getId())" />
          </div>
        </TableContent>
      </TableRow>
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
} from '@/components/';
import { Courier } from '@/views/couriers/domain/';
import {
  GetCouriersUseCase,
  DeleteCourierUseCase,
  SearchCouriersUseCase,
} from '@/views/couriers/use-cases/';
import { CourierRepositoryImpl } from '@/views/couriers/infrastructure/Courier.RepositoryImpl';
import { TABLE_HEADER_COURIER } from '@/views/couriers/presentation/constants/';
import { AppRoutesCourier } from '@/views/couriers/presentation/routes';

const repository = new CourierRepositoryImpl();
const getCouriersUseCase = new GetCouriersUseCase(repository);
const deleteCourierUseCase = new DeleteCourierUseCase(repository);
const searchCouriersUseCase = new SearchCouriersUseCase(repository);

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
</script>
