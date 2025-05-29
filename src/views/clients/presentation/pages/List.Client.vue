<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este Cliente?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar Cliente" @input="runSearch" />
          <div class="relative">
            <FilterButton> </FilterButton>
          </div>
        </div>
        <NewButton label="Nuevo Cliente" :URL="AppRoutesClient.new" />
      </div>
    </Card>
    <TableDashboard
      :headers="[...TABLE_HEADER_CLIENT]"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="clients.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="client in paginatedItems" :key="client.getId()">
        <TableContent class="text-black dark:text-white">
          {{ client.getLegalName() }}
        </TableContent>
        <TableContent class="text-black dark:text-white">
          {{ client.getType() }}
        </TableContent>
        <TableContent class="text-gray-600 dark:text-gray-300">
          {{ client.getRegistrationNumber() }}
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesClient.details(client.getId())" />
            <EditButton :route="AppRoutesClient.edit(client.getId())" />
            <TrashButton @click="open(client.getId())" />
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
import { Client } from '@/views/clients/domain/';
import {
  GetClientsUseCase,
  DeleteClientUseCase,
  SearchClientsUseCase,
} from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';
import { TABLE_HEADER_CLIENT } from '@/views/clients/presentation/constants/';
import { AppRoutesClient } from '@/views/clients/presentation/routes';

const repository = new ClientRepositoryImpl();
const getClientsUseCase = new GetClientsUseCase(repository);
const deleteClientUseCase = new DeleteClientUseCase(repository);
const searchClientsUseCase = new SearchClientsUseCase(repository);

const clients = ref<Client[]>([]);

const { searchQuery, applySearch } = useSearch<Client>({
  fetchFn: searchClientsUseCase.execute.bind(searchClientsUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() === '') {
    clients.value = await getClientsUseCase.execute();
  } else {
    clients.value = await applySearch();
  }
};

onMounted(async () => {
  clients.value = await getClientsUseCase.execute();
});

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
</script>
