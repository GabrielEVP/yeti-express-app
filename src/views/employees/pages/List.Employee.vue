<template>
  <ModalConfirmation
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar este empleado?"
    @confirm="handleDeleteConfirmation"
    @close="close"
  />
  <SideBar>
    <LoadingAbsoluteSkeleton v-if="isLoadingDetails" />
    <ModalDetailsEmployee v-if="selectedId !== null" :is-open="IsOpenDetails" :employee="selectedEmployee" @close="CloseDetails" />
    <Card class="p-3">
      <div class="flex gap-4 md:flex-row sm:justify-between">
        <div class="md:flex gap-4">
          <SearchForm class="hidden sm:block" v-model="searchQuery" placeholder="Buscar Empleado" @input="debouncedSearch" />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm class="sm:hidden" v-model="searchQuery" placeholder="Buscar Empleado" @input="debouncedSearch" />
          </FilterButton>
        </div>
        <NewButton label="Nuevo Empleado" :URL="AppRoutesEmployee.new" class="w-full sm:w-auto md:w-auto" />
      </div>
    </Card>
    <LoadingSkeleton v-if="isLoading" />
    <TableDashboard
      v-else
      :headers="TABLE_HEADER_EMPLOYEE"
      :currentPage="paginatedData.currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="paginatedData.total"
      @updatePage="handlePageChange"
    >
      <TableRow v-for="employee in paginatedData.items" :key="employee.id">
        <TableContent>{{ employee.name }}</TableContent>
        <TableContent>{{ employee.email }}</TableContent>
        <TableContent>
          <Bagde class="break-words text-right">{{ getRoleLabel(employee.role as Role) }}</Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButtonDetails @click="() => OpenDetails(String(employee.id))" />
            <EditButton :route="AppRoutesEmployee.edit(employee.id)" />
            <TrashButton @click="() => open(employee.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="employee in paginatedData.items" :key="employee.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words">
                  {{ employee.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ employee.email }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ employee.role }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButtonDetails @click="() => OpenDetails(String(employee.id))" />
                <EditButton :route="AppRoutesEmployee.edit(employee.id)" />
                <TrashButton @click="() => open(employee.id)" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDebounce, useModal, usePagination } from '@/composables/';
import { useDeleteWithModal } from '@/composables/UseModalWithDelete';
import {
  Bagde,
  Card,
  EditButton,
  EyeButtonDetails,
  FilterButton,
  LoadingAbsoluteSkeleton,
  LoadingSkeleton,
  ModalConfirmation,
  NewButton,
  SearchForm,
  SideBar,
  TableContent,
  TableDashboard,
  TableRow,
  TrashButton,
} from '@/components/';
import { DetailEmployee, getRoleLabel, ListEmployee, Role } from '@views/employees/models';
import { deleteEmployeeById, getEmployeeById, getFilteredEmployees } from '@/views/employees/services';
import { TABLE_HEADER_EMPLOYEE } from '@views/employees/constants';
import { AppRoutesEmployee } from '@views/employees/router';
import { ModalDetailsEmployee } from '@/views/employees/components/';

const isLoading = ref(false);
const error = ref<string | null>(null);
const isLoadingDetails = ref(false);
const selectedEmployee = ref<DetailEmployee | null>(null);
const searchQuery = ref('');

const { isOpen: IsOpenDetails, selectedId, open: openModalDetails, close: CloseDetails } = useModal<string>();

const OpenDetails = async (id: string) => {
  try {
    isLoadingDetails.value = true;
    selectedEmployee.value = await getEmployeeById(id);
    openModalDetails(id);
  } finally {
    isLoadingDetails.value = false;
  }
};

const { paginatedData, totalPages, startIndex, endIndex, updatePage, setPaginatedData } = usePagination<ListEmployee>();

const runSearch = async (page: number = 1) => {
  try {
    isLoading.value = true;
    error.value = null;

    const response = await getFilteredEmployees({
      search: searchQuery.value.trim(),
      page: page,
      perPage: paginatedData.value.perPage,
    });

    setPaginatedData(response);
  } catch (err) {
    error.value = 'Error al cargar los empleados';
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const handlePageChange = async (page: number) => {
  const params = updatePage(page);
  await runSearch(params.page);
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  await runSearch(1);
});

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteEmployeeById,
  successMessage: 'Empleado eliminado correctamente',
  errorMessage: 'Error al eliminar el empleado',
  onAfterDelete: async () => {
    await runSearch(paginatedData.value.currentPage);
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
