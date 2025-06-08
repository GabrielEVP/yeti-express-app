<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar esta Delivery?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm
            class="hidden md:block"
            v-model="searchQuery"
            placeholder="Buscar Delivery"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto">
            <SelectForm
              label="Estado de la Orden"
              name="type"
              id="type"
              :items="Array.from(DeliveryStatusOptions)"
            >
              <option value="">Todos</option>
            </SelectForm>
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Delivery"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nueva orden"
          :URL="AppRoutesDelivery.new"
          class="w-full sm:w-auto md:w-auto"
        />
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
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getNumber() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ formatDateCustom(delivery.getDate()) }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getClient()?.getLegalName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getCourier()?.getFullName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          {{ delivery.getService().getName() }}
        </TableContent>
        <TableContent class="text-black text-right dark:text-white break-words">
          {{ formatToDollars(delivery.getService().getTotalEarning()) }}
        </TableContent>
        <TableContent class="text-black text-center dark:text-white break-words">
          <Bagde> {{ delivery.getStatusToFormat() }} </Bagde>
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
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="delivery in paginatedItems"
            :key="delivery.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ delivery.getNumber() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatDateCustom(delivery.getDate()) }}
                </p>
              </div>
              <Bagde>
                {{ delivery.getStatusToFormat() }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
                <EditButton :route="AppRoutesDelivery.edit(delivery.getId())" />
                <DownloadButton @click="handleDownload(delivery.getId())" />
                <TrashButton @click="open(delivery.getId())" />
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
import { formatDateCustom, formatToDollars } from '@utils';
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
  DownloadButton,
  ConfirmationModal,
  FilterButton,
  SelectForm,
} from '@/components/';
import { Delivery, DeliveryStatusOptions } from '@/views/deliveries/domain/';
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
