<template>
  <SideBar>
    <BackButton />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <LoadingAbsoluteSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del empleado</h2>
          <FieldForm label="Nombre" name="name" id="name" required />
          <FieldForm label="Email" name="email" id="email" required />
          <SelectForm label="Permisos" name="role" :items="[...RoleOptions]" />
          <div v-if="!employee_id">
            <FieldForm label="Contraseña" name="password" id="password" type="password" required />
            <FieldForm label="Confirmar Contraseña" name="confirmPassword" id="confirmPassword" type="password" required />
          </div>
          <div
            :class="[
              'flex flex-col gap-4 pt-6',
              employee_id ? 'sm:flex-row justify-between items-center border-t border-gray-200 dark:border-gray-700' : 'justify-end',
            ]"
          >
            <template v-if="employee_id">
              <router-link
                :to="AppRoutesEmployee.editPassword(employee_id)"
                class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
              >
                <Lock class="h-4 w-4" />
                Cambiar Contraseña
              </router-link>
            </template>
            <div class="flex space-x-3 justify-end">
              <CancelButton @click="router.back()" />
              <AcceptButton :disabled="!meta.valid" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Lock } from 'lucide-vue-next';
import { useVeeForm } from '@/composables';
import { AcceptButton, BackButton, CancelButton, Card, FieldForm, LoadingAbsoluteSkeleton, SelectForm, SideBar } from '@/components';
import { FormEmployee, RoleOptions } from '@/views/employees/models';
import { CreateEmployeeSchema, EditEmployeeSchema } from '@/views/employees/schema';
import { createEmployee, getEmployeeById, updateEmployee } from '@/views/employees/services/';
import { AppRoutesEmployee } from '@/views/employees/router/';

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const employee_id = route.params.id as string;

const EmployeeSchema = employee_id ? EditEmployeeSchema : CreateEmployeeSchema;

const { initializeForm, onSubmit, meta } = useVeeForm<FormEmployee>({
  id: employee_id,
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

onMounted(async () => {
  await initializeForm();

  await nextTick();
  formReady.value = true;
});
</script>
