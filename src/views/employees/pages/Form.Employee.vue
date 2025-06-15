<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del empleado</h2>
          <FieldForm label="Nombre" name="name" id="name" required />
          <FieldForm label="Email" name="email" id="email" required />
          <SelectForm label="Permisos" name="role" :items="[...RoleOptions]" />
          <FieldForm label="Contraseña" name="password" id="password" type="password" required />
          <FieldForm label="Confirmar Contraseña" name="confirmPassword" id="confirmPassword" type="password" required />
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
import { Employee } from '@/views/employees/';
import { RoleOptions } from '@/views/employees/';
import { EmployeeSchema } from '@/views/employees/schema';
import { getEmployeeById, createEmployee, updateEmployee } from '@/views/employees/services/';
import { AppRoutesEmployee } from '@/views/employees/router/';

const router = useRouter();
const route = useRoute();
const EmployeeId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Employee>({
  id: EmployeeId,
  getById: getEmployeeById,
  create: createEmployee,
  update: (values, id) => updateEmployee(values, id),
  defaultRoute: AppRoutesEmployee.list,
  messages: {
    createError: 'Error al crear el Empleado',
    updateError: 'Error al actualizar el Empleado',
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
