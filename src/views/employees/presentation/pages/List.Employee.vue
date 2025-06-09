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
          <SearchForm
            class="hidden sm:block"
            v-model="searchQuery"
            placeholder="Buscar Empleado"
            @input="runSearch"
          />
          <FilterButton class="w-full sm:w-auto block sm:hidden">
            <SearchForm
              class="sm:hidden"
              v-model="searchQuery"
              placeholder="Buscar Empleado"
              @input="runSearch"
            />
          </FilterButton>
        </div>
        <NewButton
          label="Nuevo Empleado"
          :URL="AppRoutesEmployee.new"
          class="w-full sm:w-auto md:w-auto"
        />
      </div>
    </Card>
    <TableDashboard
      :headers="TABLE_HEADER_EMPLOYEE"
      :currentPage="currentPage"
      :totalPages="totalPages"
      :startIndex="startIndex"
      :endIndex="endIndex"
      :totalItems="employees.length"
      @updatePage="updatePage"
    >
      <TableRow v-for="employee in paginatedItems" :key="employee.getId()">
        <TableContent>{{ employee.getName() }}</TableContent>
        <TableContent>{{ employee.getEmail() }}</TableContent>
        <TableContent>
          <Bagde class="break-words text-right">{{ employee.getRole() }} </Bagde>
        </TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesEmployee.details(employee.getId())" />
            <EditButton :route="AppRoutesEmployee.edit(employee.getId())" />
            <TrashButton @click="() => open(employee.getId())" />
          </div>
        </TableContent>
      </TableRow>
      <template #mobile-rows>
        <div class="lg:hidden space-y-4">
          <div
            v-for="employee in paginatedItems"
            :key="employee.getId()"
            class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
          >
            <div class="flex justify-between items-start mb-3">
              <div class="w-full">
                <p
                  class="font-semibold max-w-[160px] md:max-w-[300px] text-gray-900 dark:text-gray-50 break-words"
                >
                  {{ employee.getName() }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 break-words">
                  {{ employee.getEmail() }}
                </p>
              </div>
              <Bagde class="break-words text-right">
                {{ employee.getRole() }}
              </Bagde>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex gap-2">
                <EyeButton :route="AppRoutesEmployee.details(employee.getId())" />
                <EditButton :route="AppRoutesEmployee.edit(employee.getId())" />
                <TrashButton @click="() => open(employee.getId())" />
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
} from '@/components/';
import { Employee } from '@/views/employees/domain/Employee';
import {
  GetEmployeesUseCase,
  DeleteEmployeeUseCase,
  SearchEmployeesUseCase,
} from '@/views/employees/use-cases/';
import { EmployeeRepositoryImpl } from '@/views/employees/infrastructure/Employee.RepositoryImpl';
import { AppRoutesEmployee } from '@/views/employees/presentation/routes/AppRoutes.Employee';
import { TABLE_HEADER_EMPLOYEE } from '@/views/employees/presentation/constants';

const repository = new EmployeeRepositoryImpl();
const getEmployeesUseCase = new GetEmployeesUseCase(repository);
const deleteEmployeeUseCase = new DeleteEmployeeUseCase(repository);
const searchEmployeesUseCase = new SearchEmployeesUseCase(repository);

const employees = ref<Employee[]>([]);

const { searchQuery, applySearch } = useSearch<Employee>({
  fetchFn: searchEmployeesUseCase.execute.bind(searchEmployeesUseCase),
  autoSearch: false,
});

const runSearch = async () => {
  if (searchQuery.value.trim() == '') {
    return (employees.value = await getEmployeesUseCase.execute());
  }

  employees.value = await applySearch();
};

onMounted(async () => {
  employees.value = await getEmployeesUseCase.execute();
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  employees,
  15
);

const { isOpen, open, close, confirmDelete } = useDeleteWithModal({
  deleteFn: deleteEmployeeUseCase.execute.bind(deleteEmployeeUseCase),
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
