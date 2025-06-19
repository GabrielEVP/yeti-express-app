<template>
  <SideBar>
    <ModalConfirmation
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Cliente?"
      @confirm="handleDeleteConfirmation"
      @close="close"
    />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden md:block" v-model="searchQuery" placeholder="Buscar Cliente" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto">
            <SelectFilter label="Tipo de cliente" name="type" id="type" :items="clientTypeOptions" v-model="selectedType">
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
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Cliente" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <NewButton label="Nuevo Cliente" :URL="AppRoutesClient.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="[...TABLE_HEADER_CLIENT]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="clients.length"
      @updatePage="updatePage"
      :sort-state="sortConfig"
      @sort="handleSort"
    >
      <TableRow v-for="client in paginatedItems" :key="client.id">
        <TableContent class="text-black dark:text-white break-words">
          {{ client.legalName }}
        </TableContent>
        <TableContent class="text-black dark:text-white break-words">
          <Bagde>{{ formatClientType(client.type as ClientType) }}</Bagde>
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300 break-words">
          {{ client.registrationNumber }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesClient.details(client.id)" />
            <EditButton :route="AppRoutesClient.edit(client.id)" />
            <TrashButton v-if="client.canDelete" @click="open(client.id)" />
            <DownloadButton v-if="client.hasHadDebt" @click="handleReport(client.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="client in paginatedItems" :key="client.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ client.legalName }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ client.registrationNumber }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ client.type }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesClient.details(client.id)" />
                <EditButton :route="AppRoutesClient.edit(client.id)" />
                <TrashButton v-if="client.canDelete" @click="open(client.id)" />
                <DownloadButton v-if="client.hasHadDebt" @click="handleReport(client.id)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { usePagination, useSearch, useDebounce } from '@/composables/';
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
  ModalConfirmation,
  FilterButton,
  LoadingSkeleton,
} from '@/components/';
import SelectFilter from '@components/forms/SelectFilter.vue';
import { Client, ClientType, ClientTypeOptions, formatClientType } from '@/views/clients/';
import { searchClients, deleteClientById, getClientDebtReport, getFilteredClients } from '@/views/clients/service/';
import { TABLE_HEADER_CLIENT } from '@/views/clients/constants/';
import { AppRoutesClient } from '@/views/clients/router';

const clients = ref<Client[]>([]);
const selectedType = ref<string>('');
const selectedCredit = ref<string>('');
const isLoading = ref(false);
const error = ref<string | null>(null);
const sortConfig = ref<{ column: keyof Client; order: 'asc' | 'desc' } | null>(null);

const clientTypeOptions = [...ClientTypeOptions];

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(clients, 15);

const { searchQuery } = useSearch<Client>({
  fetchFn: searchClients,
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

    const response = await getFilteredClients({
      search: searchQuery.value.trim(),
      filters,
      sortBy: sortConfig.value?.column,
      sortDirection: sortConfig.value?.order,
    });

    clients.value = response;
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

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  await runSearch();
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteClientById,
  successMessage: 'Repartidor eliminado exitosamente',
  errorMessage: 'Error al eliminar el repartidor',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};

const handleReport = async (clientId: string) => {
  const blob = await getClientDebtReport(clientId);
  const filename = `informe_deuda_${clientId}.pdf`;
  const mimeType = 'application/pdf';

  if (!blob) {
    console.error('No se proporcionó un Blob para descargar.');
    return;
  }

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  a.type = mimeType;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  window.URL.revokeObjectURL(url);
};
</script>
