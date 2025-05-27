<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Courier?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar Courier" @input="applyFilters" />
        </div>
        <NewButton label="Nuevo Courier" :URL="courierAppRoutes.new" />
      </div>
    </Card>
    <TableDashboard
      :headers="[...DEALER_TABLE_HEADER]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="couriers.length"
      @updatePage="updatePage"
      @sort="handleSort"
    >
      <TableRow v-for="(courier, id) in paginatedItems" :key="courier.id">
        <TableContent class="text-black dark:text-white">
          {{ courier.firstName }} {{ courier.lastName }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ courier.phone }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :id="String(courier.id)" route="/couriers" />
            <EditButton :id="String(courier.id)" route="/couriers/edit" />
            <TrashButton @click="open(courier.id)" />
          </div>
        </TableContent>
      </TableRow>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';
import {
  usePagination,
  useModal,
  useFetch,
  useFilterSortSearch,
  useDeleteWithFeedback,
} from '@/composables/';
import { Courier, getCouriers, deleteCourier, getFilterCouriers } from '@/views/couriers/';
import {
  SideBar,
  Card,
  TableContent,
  TableRow,
  TableDashboard,
  SearchForm,
  FilterButton,
  NewButton,
  TrashButton,
  EditButton,
  EyeButton,
  ConfirmationModal,
} from '@/components/';
import { DEALER_TABLE_HEADER, courierAppRoutes } from '@/views/couriers';

const couriers = ref<Courier[]>([]);

const { searchQuery, filters, applyFilters, handleSort, setDynamicFilters } = useFilterSortSearch({
  columns: ['firstName', 'lastName', 'phone', 'commission'],
  fetchFn: getFilterCouriers,
  dataRef: couriers,
});

const { handleSubmit } = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    phone: '',
    commission: '',
  },
});

const applySelectFilters = handleSubmit((formValues) => {
  setDynamicFilters(formValues);
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  couriers,
  15
);

const { executeFetch } = useFetch<Courier[]>({
  fetchFunction: getCouriers,
  errorMessageOnFailure: 'Error al cargar Repartidor',
});

onMounted(async () => {
  couriers.value = await executeFetch();
});

const { deleteAndNotify } = useDeleteWithFeedback<string>({
  deleteFn: deleteCourier,
  onSuccessMessage: 'Courier eliminado exitosamente',
});

const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
  await deleteAndNotify(String(selectedId.value), async () => {
    couriers.value = await executeFetch();
  });
  close();
};
</script>
