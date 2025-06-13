<template>
  <ConfirmationDeleteModal
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar este empleado?"
    @confirm="handleDeleteConfirmation"
    @cancel="close"
  />
  <SideBar>
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
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="employees.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="employee in paginatedItems" :key="employee.id">
        <TableContent>{{ employee.name }}</TableContent>
        <TableContent>{{ employee.email }}</TableContent>
        <TableContent>
          <Bagde class="break-words text-right">{{ employee.role }} </Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesEmployee.details(employee.id)" />
            <EditButton :route="AppRoutesEmployee.edit(employee.id)" />
            <TrashButton @click="() => open(employee.id)" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div v-for="employee in paginatedItems" :key="employee.id" class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
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
                <EyeButton :route="AppRoutesEmployee.details(employee.id)" />
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
import { ref, onMounted } from 'vue';
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
  EyeButton,
  ConfirmationDeleteModal,
  FilterButton,
  LoadingSkeleton,
} from '@/components/';
import { Employee } from '@/views/employees/';
import { getAllEmployees, deleteEmployeeById, searchEmployees } from '@/views/employees/';
import { AppRoutesEmployee } from '@/views/employees/';
import { TABLE_HEADER_EMPLOYEE } from '@/views/employees/';

const employees = ref<Employee[]>([]);
const isLoading = ref(false);

const { searchQuery, applySearch } = useSearch<Employee>({
  fetchFn: searchEmployees,
  autoSearch: false,
});

const runSearch = async () => {
  try {
    isLoading.value = true;
    if (searchQuery.value.trim() == '') {
      return (employees.value = await getAllEmployees());
    }
    employees.value = await applySearch();
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = useDebounce(runSearch, 500);

onMounted(async () => {
  employees.value = await getAllEmployees();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(employees, 15);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteEmployeeById,
  successMessage: 'Empleado eliminado correctamente',
  errorMessage: 'Error al eliminar el empleado',
  onAfterDelete: async () => {
    await runSearch();
  },
});

const handleDeleteConfirmation = async () => {
  await confirmDelete();
};
</script>
