<template>
  <SideBar>
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
            <SelectForm
              label="Tipo de cliente"
              name="type"
              id="type"
              :items="Array.from(ClientTypeOptions)"
            >
              <option value="">Todos</option>
            </SelectForm>
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Cliente"
              @input="runSearch"
            />
          </FilterButton>
        </div>
      </div>
    </Card>
    <TableDashboard
<<<<<<< HEAD:src/views/clients/presentation/pages/accounts-receivables/List.AccountReceivable.Client.vue
      :headers="[...TABLE_HEADER_ACCOUNT_RECEIVABLE]"
=======
      :headers="[...TABLE_HEADER_CLIENT_DEBT]"
>>>>>>> a424d06 (Refactor TypeScript props using type annotations):src/views/clients/presentation/pages/debt/List.Debt.Client.vue
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="clients.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="client in paginatedItems" :key="client.getId()">
        <TableContent class="text-left text-black dark:text-white break-words">
          {{ client.getLegalName() }}
        </TableContent>
        <TableContent class="text-center text-black dark:text-white break-words">
          <Bagde>{{ client.getFormatType() }}</Bagde>
        </TableContent>
        <TableContent class="text-center text-gray-600 dark:text-gray-300 break-words">
          {{ client.getRegistrationNumber() }}
        </TableContent>
<<<<<<< HEAD:src/views/clients/presentation/pages/accounts-receivables/List.AccountReceivable.Client.vue
        <TableContent class="text-gray-600 dark:text-gray-300 text-right break-words">
          {{ formatToDollars(5) }}
=======
        <TableContent class="text-right text-gray-600 dark:text-gray-300 break-words">
          {{ formatToDollars(client.getDebtsAmount()) }}
>>>>>>> a424d06 (Refactor TypeScript props using type annotations):src/views/clients/presentation/pages/debt/List.Debt.Client.vue
        </TableContent>
        <TableContent>
          <Deliverie :client="client" />
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
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ formatToDollars(client.getDebtsAmount()) }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ client.getFormatType() }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <Deliverie :client="client" />
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
import { formatToDollars } from '@utils';
import {
  SideBar,
  Card,
  Bagde,
  TableContent,
  TableRow,
  TableDashboard,
  SearchForm,
<<<<<<< HEAD:src/views/clients/presentation/pages/accounts-receivables/List.AccountReceivable.Client.vue
  EditButton,
  EyeButton,
=======
>>>>>>> a424d06 (Refactor TypeScript props using type annotations):src/views/clients/presentation/pages/debt/List.Debt.Client.vue
  FilterButton,
  SelectForm,
} from '@/components/';
import Deliverie from '@/views/clients/presentation/components/debt/deliverie.vue';
import { Client, ClientTypeOptions } from '@/views/clients/domain/';
import { GetClientsUseCase, SearchClientsUseCase } from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';
<<<<<<< HEAD:src/views/clients/presentation/pages/accounts-receivables/List.AccountReceivable.Client.vue
import { TABLE_HEADER_ACCOUNT_RECEIVABLE } from '@/views/clients/presentation/constants/';
import { AppRoutesClient } from '@/views/clients/presentation/routes';
=======
import { TABLE_HEADER_CLIENT_DEBT } from '@/views/clients/presentation/constants/';
>>>>>>> a424d06 (Refactor TypeScript props using type annotations):src/views/clients/presentation/pages/debt/List.Debt.Client.vue

const repository = new ClientRepositoryImpl();
const getClientsUseCase = new GetClientsUseCase(repository);
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
  10
);

const handlePayment = (clientId, deliveryId, type) => {
  console.log('Procesando pago:', clientId, deliveryId, type);
};

const processPayment = (paymentData) => {
  console.log('Procesando pago:', paymentData);
};

const closeModal = () => {
  console.log('Cerrando modal de pago');
};
</script>
