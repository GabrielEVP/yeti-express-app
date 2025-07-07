<template>
  <SideBar>
    <BackButton />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="h-full">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Cambiar contraseña del empleado</h2>
          <div class="grid grid-cols-1 gap-6">
            <FieldForm type="password" label="Nueva contraseña" name="password" id="name" />
            <FieldForm type="password" label="Repite la nueva contraseña" name="confirmPassword" id="email" />
          </div>
          <div class="flex justify-end mt-4 space-x-3">
            <CancelButton @click="router.back()" />
            <AcceptButton :disabled="!meta.valid" />
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useVeeForm } from '@/composables/';
import { AcceptButton, BackButton, CancelButton, Card, FieldForm, SideBar } from '@/components/';
import { Password } from '@/views/employees/models';
import { PasswordSchema } from '@/views/employees/schema';
import { updatePassword } from '@/views/employees/services/';
import { AppRoutesEmployee } from '@/views/employees/router/';
import { onMounted } from 'vue';

const router = useRouter();
const route = useRoute();
const EmployeeId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Password>({
  id: EmployeeId,
  update: (values, id) => updatePassword(values, id),
  defaultRoute: AppRoutesEmployee.list,
  messages: {
    updateError: 'Error al actualizar la contraseña del empleado',
    updateSuccess: 'Contraseña del empleado actualizada correctamente',
  },
  validation: {
    schema: PasswordSchema,
    initialValues: {},
  },
});
onMounted(initializeForm);
</script>
