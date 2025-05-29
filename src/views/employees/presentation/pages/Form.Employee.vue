<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">
            Información del empleado
          </h2>
          <FieldForm label="Nombre" name="name" id="name" required />
          <FieldForm label="Email" name="email" id="email" required />
          <FieldForm label="Contraseña" name="password" id="password" type="password" required />
          <SelectForm label="Permisos" name="role" :items="[...RoleOptions]" />
          <div class="flex justify-end space-x-2">
            <CancelButton @click="router.back()" />
            <AcceptButton :disabled="!meta.valid" />
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { SideBar, Card, FieldForm, SelectForm, AcceptButton, CancelButton } from '@/components';
import { Employee } from '@/views/employees/domain/Employee';
import { RoleOptions } from '@/views/employees/domain/Role';
import { EmployeeSchema } from '@/views/employees/schemas/Employee.Schema';
import {
  GetEmployeeByIdUseCase,
  CreateEmployeeUseCase,
  UpdateEmployeeUseCase,
} from '@/views/employees/use-cases/';
import { EmployeeRepositoryImpl } from '@/views/employees/infrastructure/Employee.RepositoryImpl';
import { mapFormToEmployee } from '@/views/employees/adapters/Employee.FormAdapter';
import { AppRoutesEmployee } from '@/views/employees/presentation/routes/';

const router = useRouter();

const repository = new EmployeeRepositoryImpl();
const getEmployeeById = new GetEmployeeByIdUseCase(repository);
const createEmployeeUseCase = new CreateEmployeeUseCase(repository);
const updateEmployeeUseCase = new UpdateEmployeeUseCase(repository);

const route = useRoute();
const EmployeeId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Employee>({
  id: EmployeeId,
  getById: async (id) => {
    const employee = await getEmployeeById.execute(id);
    if (!employee) throw new Error('Employee not found');
    return employee;
  },
  create: (formValues) => {
    const employee = mapFormToEmployee(formValues);
    return createEmployeeUseCase.execute(employee);
  },
  update: (formValues, id) => {
    const employee = mapFormToEmployee({ ...formValues, id });
    return updateEmployeeUseCase.execute(id, employee);
  },
  defaultRoute: AppRoutesEmployee.list,
  messages: {
    createError: 'Error al crear el empleado',
    updateError: 'Error al actualizar el empleado',
    createSuccess: 'Empleado creado correctamente',
    updateSuccess: 'Empleado actualizado correctamente',
  },
  validation: {
    schema: EmployeeSchema,
    initialValues: {},
  },
});

onMounted(initializeForm);
</script>
