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
          <SearchForm v-model="searchQuery" placeholder="Buscar Servicio" @input="applyFilters" />
        </div>
        <NewButton label="Nuevo Servicio" :URL="serviceAppRoutes.new" />
      </div>
    </Card>
    <TableDashboard
      :headers="[...SERVICE_TABLE_HEADER]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="services.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="(service, id) in paginatedItems" :key="service.id">
        <TableContent class="text-black dark:text-white">
          {{ service.name }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.amount }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ service.comision }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ totalExpenses(service) }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ totalEarnings(service) }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :id="String(service.id)" route="/services" />
            <EditButton :id="String(service.id)" route="/services/edit" />
            <TrashButton @click="open(service.id)" />
          </div>
        </TableContent>
      </TableRow>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  usePagination,
  useModal,
  useFetch,
  useFilterSortSearch,
  useDeleteWithFeedback,
} from '@/composables/';
import { Service, getServices, deleteService, getFilterServices } from '@/views/services/';
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
import { SERVICE_TABLE_HEADER, serviceAppRoutes } from '@/views/services';

const services = ref<Service[]>([]);

const { searchQuery, applyFilters } = useFilterSortSearch({
  columns: ['name', 'amount', 'comision'],
  fetchFn: getFilterServices,
  dataRef: services,
});

const totalExpenses = (service: Service) => {
  return service.bills?.reduce((billSum, bill) => billSum + (Number(bill.amount) || 0), 0) || 0;
};

const totalEarnings = (service: Service) => {
  const totalExpense = totalExpenses(service);
  const serviceAmount = Number(service.amount || 0);
  const serviceCommission = Number(service.comision || 0);

  return serviceAmount - serviceCommission - totalExpense;
};

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  services,
  15
);

const { executeFetch } = useFetch<Service[]>({
  fetchFunction: getServices,
  errorMessageOnFailure: 'Error al cargar Servicios',
});

onMounted(async () => {
  services.value = await executeFetch();
});

const { deleteAndNotify } = useDeleteWithFeedback<string>({
  deleteFn: deleteService,
  onSuccessMessage: 'Servicio eliminado exitosamente',
});

const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
  await deleteAndNotify(String(selectedId.value), async () => {
    services.value = await executeFetch();
  });
  close();
};
</script>
