<template>
  <SideBar>
    <LoadingSkeleton v-if="isLoading" />
    <ConfirmationDeleteModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Servicio?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm
            class="hidden sm:block"
            v-model="searchQuery"
            placeholder="Buscar Servicio"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Servicio"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nuevo Servicio"
          :URL="AppRoutesService.new"
          class="w-full sm:w-auto md:w-auto"
        />
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
      <TableRow v-for="service in paginatedItems" :key="service.getId()">
        <TableContent class="text-black dark:text-white">
          {{ service.getName() }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.getAmount()) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.getComision()) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.getTotalExpense()) }}
        </TableContent>
        <TableContent class="text-right text-gray-600 dark:text-gray-300">
          {{ formatToDollars(service.getTotalEarning()) }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesService.details(service.getId())" />
            <EditButton :route="AppRoutesService.edit(service.getId())" />
            <TrashButton @click="open(service.getId())" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="service in paginatedItems"
            :key="service.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ service.getName() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  Comision {{ formatToDollars(service.getComision()) }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ formatToDollars(service.getTotalEarning()) }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesService.details(service.getId())" />
                <EditButton :route="AppRoutesService.edit(service.getId())" />
                <TrashButton @click="open(service.getId())" />
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
  SelectForm,
  LoadingSkeleton,
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
const isLoading = ref(false);

const { searchQuery, applySearch } = useSearch<Service>({
  fetchFn: searchServicesUseCase.execute.bind(searchServicesUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    if (searchQuery.value.trim() === '') {
      services.value = await getServicesUseCase.execute();
    } else {
      services.value = await applySearch();
    }
  } finally {
    isLoading.value = false;
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
