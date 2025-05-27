<template>
  <ConfirmationModal
    :isOpen="isOpen"
    message="¿Estás seguro que quieres eliminar este empleado?"
    @confirm="handleDeleteConfirmation"
    @cancel="close"
  />
  <SideBar>
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar empleado" @input="runSearch" />
        </div>
        <NewButton label="Nuevo empleado" :URL="AppRoutesEmployee.new" />
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
        <TableContent>{{ employee.getRole() }}</TableContent>
        <TableContent>
          <div class="flex gap-1 justify-center">
            <EyeButton :route="AppRoutesEmployee.details(employee.getId())" />
            <EditButton :route="AppRoutesEmployee.edit(employee.getId())" />
            <TrashButton @click="() => open(employee.getId())" />
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
