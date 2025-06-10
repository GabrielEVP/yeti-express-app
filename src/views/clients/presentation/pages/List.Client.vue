<template>
  <SideBar>
    <ConfirmationDeleteModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Cliente?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm
            class="hidden md:block"
            v-model="searchQuery"
            placeholder="Buscar Cliente"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto">
            <SelectFilter
              label="Tipo de cliente"
              name="type"
              id="type"
              :items="clientTypeOptions"
              v-model="selectedType"
            >
              <option value="">Todos</option>
            </SelectFilter>
            <SelectFilter
              label="Permitir crédito"
              name="allowCredit"
              id="allowCredit"
              :items="[
                { value: 'true', label: 'Sí' },
                { value: 'false', label: 'No' },
              ]"
              v-model="selectedCredit"
            >
              <option value="">Todos</option>
            </SelectFilter>
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Cliente"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nuevo Cliente"
          :URL="AppRoutesClient.new"
          class="w-full sm:w-auto md:w-auto"
        />
      </div>
    </Card>
    <div
      v-if="error"
      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      {{ error }}
    </div>
    <TableDashboard
      v-if="!isLoading"
      :headers="[...TABLE_HEADER_CLIENT]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="totalItems"
      :sortState="sortConfig"
      @updatePage="updatePage"
      @sort="handleSort"
    >
      <TableRow v-for="client in paginatedItems" :key="client.getId()">
        <TableContent class="text-black dark:text-white break-words">
          {{ client.getLegalName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          <Bagde>{{ client.getFormatType() }}</Bagde>
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300 break-words">
          {{ client.getRegistrationNumber() }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesClient.details(client.getId())" />
            <EditButton :route="AppRoutesClient.edit(client.getId())" />
            <TrashButton @click="open(client.getId())" />
            <DownloadButton @click="handleReport(client)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="client in paginatedItems"
            :key="client.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ client.getLegalName() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ client.getRegistrationNumber() }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ client.getFormatType() }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesClient.details(client.getId())" />
                <EditButton :route="AppRoutesClient.edit(client.getId())" />
                <TrashButton @click="open(client.getId())" />
                <DownloadButton @click="handleReport(client)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
    <div v-else class="flex justify-center items-center p-8">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"
      ></div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePagination, useSearch } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
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
  DownloadButton,
  EyeButton,
  ConfirmationDeleteModal,
  FilterButton,
} from '@/components/';
import { Client, ClientTypeOptions } from '@/views/clients/domain/';
import {
  DeleteClientUseCase,
  SearchClientsUseCase,
  GetClientDebtReportUseCase,
} from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';
import { TABLE_HEADER_CLIENT } from '@/views/clients/presentation/constants/';
import { AppRoutesClient } from '@/views/clients/presentation/routes';
import SelectFilter from '@components/forms/SelectFilter.vue';

const repository = new ClientRepositoryImpl();
const deleteClientUseCase = new DeleteClientUseCase(repository);
const searchClientsUseCase = new SearchClientsUseCase(repository);
const getClientDebtReportUseCase = new GetClientDebtReportUseCase(repository);

const clients = ref<Client[]>([]);
const selectedType = ref<string>('');
const selectedCredit = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const sortConfig = ref<{ column: keyof Client; order: 'asc' | 'desc' } | null>(null);

const clientTypeOptions = [...ClientTypeOptions];

const { searchQuery } = useSearch<Client>({
  fetchFn: searchClientsUseCase.execute.bind(searchClientsUseCase),
  autoSearch: false,
});

watch([selectedType, selectedCredit, sortConfig], () => {
  runSearch();
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const filters: Record<string, any> = {};

    if (selectedType.value) {
      filters.type = selectedType.value;
    }

    if (selectedCredit.value) {
      filters.allowCredit = selectedCredit.value === 'true';
    }

    const response = await repository.getFilterAll({
      search: searchQuery.value.trim(),
      filters,
      page: currentPage.value,
      perPage: 15,
      sortBy: sortConfig.value?.column,
      sortDirection: sortConfig.value?.order,
    });

    clients.value = response.data;
    totalItems.value = response.total;
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error al cargar los clientes';
    clients.value = [];
    totalItems.value = 0;
  } finally {
    isLoading.value = false;
  }
};

const handleSort = (config: { column: string; order: 'asc' | 'desc' } | null) => {
  if (config) {
    sortConfig.value = {
      column: config.column as keyof Client,
      order: config.order,
    };
  } else {
    sortConfig.value = null;
  }
};

onMounted(async () => {
  await runSearch();
});

const totalItems = ref(0);
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  clients,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteClientUseCase.execute.bind(deleteClientUseCase),
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const handleReport = async (client: any) => {
  try {
    const blob = await getClientDebtReportUseCase.execute(client.getId());
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
    setTimeout(() => window.URL.revokeObjectURL(url), 100);
  } catch (error) {}
};
</script>
