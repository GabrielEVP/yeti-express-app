<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Servicio?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar Servicio" @input="runSearch" />
        </div>
        <NewButton label="Nuevo Servicio" :URL="AppRoutesService.new" />
      </div>
    </Card>
    <TableDashboard
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
          {{ service.getName() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.getAmount() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.getComision() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.getTotalExpense() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.getTotalEarning() }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesService.details(service.getId())" />
            <EditButton :route="AppRoutesService.edit(service.getId())" />
            <TrashButton @click="open(service.getId())" />
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
import { Service } from '@/views/services/domain/';
import {
  GetServicesUseCase,
  DeleteServiceUseCase,
  SearchServicesUseCase,
} from '@/views/services/use-cases/';
import { ServiceRepositoryImpl } from '@/views/services/infrastructure/Service.RepositoryImpl';
import { TABLE_HEADER_SERVICE } from '@/views/services/presentation/constants/';
import { AppRoutesService } from '@/views/services/presentation/routes';

const repository = new ServiceRepositoryImpl();
const getServicesUseCase = new GetServicesUseCase(repository);
const deleteServiceUseCase = new DeleteServiceUseCase(repository);
const searchServicesUseCase = new SearchServicesUseCase(repository);

const services = ref<Service[]>([]);

const { searchQuery, applySearch } = useSearch<Service>({
  fetchFn: searchServicesUseCase.execute.bind(searchServicesUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() === '') {
    services.value = await getServicesUseCase.execute();
  } else {
    services.value = await applySearch();
  }
};

onMounted(async () => {
  services.value = await getServicesUseCase.execute();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  services,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteServiceUseCase.execute.bind(deleteServiceUseCase),
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
