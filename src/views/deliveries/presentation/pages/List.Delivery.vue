<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta Delivery?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar Delivery" @input="runSearch" />
          <div class="relative">
            <FilterButton> </FilterButton>
          </div>
        </div>
        <NewButton label="Nueva Orden" :URL="AppRoutesDelivery.new" />
      </div>
    </Card>
    <TableDashboard
      :headers="[...TABLE_HEADER_DELIVERY]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="deliveries.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="delivery in paginatedItems" :key="delivery.getId()">
        <TableContent class="text-black dark:text-white">
          {{ delivery.getNumber() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ formatDateCustom(delivery.getDate()) }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ delivery.getClient().getLegalName() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          <Bagde>
            {{ delivery.getStatus() }}
          </Bagde>
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ delivery.getService().getName() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ delivery.getService().getTotalEarning() }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
            <EditButton :route="AppRoutesDelivery.edit(delivery.getId())" />
            <DownloadButton @click="handleDownload(delivery.getId())" />
            <TrashButton @click="open(delivery.getId())" />
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
import { formatDateCustom } from '@utils';
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
  DownloadButton,
  ConfirmationModal,
} from '@/components/';
import { Delivery } from '@/views/deliveries/domain/';
import {
  GetAllDeliveriesUseCase,
  DeleteDeliveryUseCase,
  SearchDeliveriesUseCase,
} from '@/views/deliveries/use-cases/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';
import { TABLE_HEADER_DELIVERY } from '@/views/deliveries/presentation/constants/';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes';

const repository = new DeliveryRepositoryImpl();
const getDeliveriesUseCase = new GetAllDeliveriesUseCase(repository);
const deleteDeliveryUseCase = new DeleteDeliveryUseCase(repository);
const searchDeliveriesUseCase = new SearchDeliveriesUseCase(repository);

const deliveries = ref<Delivery[]>([]);

const { searchQuery, applySearch } = useSearch<Delivery>({
  fetchFn: searchDeliveriesUseCase.execute.bind(searchDeliveriesUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() === '') {
    deliveries.value = await getDeliveriesUseCase.execute();
  } else {
    deliveries.value = await applySearch();
  }
};

onMounted(async () => {
  deliveries.value = await getDeliveriesUseCase.execute();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  deliveries,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteDeliveryUseCase.execute.bind(deleteDeliveryUseCase),
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const handleDownload = async (deliveryId: string) => {
  await confirmDelete();
};
</script>
