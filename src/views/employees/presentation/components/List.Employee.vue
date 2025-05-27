<template>
  <SideBar>
    <ConfirmationModal
      :isOpen="isOpen"
      message="¿Estás seguro que quieres eliminar este empleado?"
      @confirm="handleDeleteConfirmation"
      @cancel="close"
    />
    <Card class="p-3">
      <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
        <div class="flex-grow flex gap-2">
          <SearchForm v-model="searchQuery" placeholder="Buscar empleado" @input="applyFilters" />
        </div>
        <NewButton label="Nuevo empleado" :URL="AppRoutesEmployee.new" />
      </div>
    </Card>
    <TableDashboard
      :headers="EMPLOYEE_TABLE_HEADER"
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
            <EyeButton
              :id="employee.getId()"
              :route="AppRoutesEmployee.details(employee.getId())"
            />
            <EditButton :id="employee.getId()" :route="AppRoutesEmployee.edit(employee.getId())" />
            <TrashButton @click="() => open(employee.getId())" />
          </div>
        </TableContent>
      </TableRow>
    </TableDashboard>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useForm } from 'vee-validate';

import {
  usePagination,
  useModal,
  useFilterSortSearch,
  useDeleteWithFeedback,
  useFetch,
} from '@/composables/';

import { Employee } from '@/views/employees/domain/Employee';
import { AppRoutesEmployee } from '@/views/employees/presentation/routes/AppRoutes.Employee';

import { EmployeeRepositoryImpl } from '@/views/employees/infrastructure/Employee.RepositoryImpl';
import { GetEmployeesUseCase } from '@/views/employees/use-cases/Employee.GetUseCase';
import { DeleteEmployeeUseCase } from '@/views/employees/use-cases/Employee.DeleteUseCase';

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

// Constantes UI
const EMPLOYEE_TABLE_HEADER = [
  { label: 'Nombre legal', key: 'legal_name' },
  { label: 'R.I.F', key: 'registration_number' },
];

// Instanciamos repositorio y casos de uso
const repository = new EmployeeRepositoryImpl();
const getEmployeesUseCase = new GetEmployeesUseCase(repository);
const deleteEmployeeUseCase = new DeleteEmployeeUseCase(repository);

const employees = ref<Employee[]>([]);

const { searchQuery, applyFilters } = useFilterSortSearch({
  columns: ['name', 'email', 'role'],
  fetchFn: async (params) => {
    return await getEmployeesUseCase.execute();
  },
  dataRef: employees,
});

// Manejo de formulario para filtros select (opcional)
const { handleSubmit } = useForm({
  initialValues: {
    name: '',
    email: '',
    role: '',
  },
});

// Paginación
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(
  employees,
  15
);

// Fetch genérico con control de error
const { executeFetch } = useFetch<Employee[]>({
  fetchFunction: getEmployeesUseCase.execute.bind(getEmployeesUseCase),
  errorMessageOnFailure: 'Error al cargar empleados',
});

onMounted(async () => {
  try {
    employees.value = await executeFetch();
  } catch (e) {
    // Aquí puedes mostrar mensaje de error si quieres
  }
});

// Delete con feedback y recarga usando caso de uso
const { deleteAndNotify } = useDeleteWithFeedback<string>({
  deleteFn: deleteEmployeeUseCase.execute.bind(deleteEmployeeUseCase),
  onSuccessMessage: 'Empleado eliminado exitosamente',
});

// Modal para confirmación eliminación
const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
  if (!selectedId.value) return;
  await deleteAndNotify(selectedId.value, async () => {
    employees.value = await executeFetch();
  });
  close();
};
</script>
