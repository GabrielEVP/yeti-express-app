<template>
  <SideBar>
    <BackButton  />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="h-full">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Cambiar contraseña</h2>
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
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { useAlert } from '@/composables/';
import { SideBar, Card, FieldForm, AcceptButton, CancelButton, BackButton } from '@/components/';
import { Password, PasswordSchema, PASSWORDDEFAULTFORMVALUES, updatePassword } from '@/views/users/';

const { handleSubmit, meta } = useForm<Password>({
  validationSchema: PasswordSchema,
  initialValues: { ...PASSWORDDEFAULTFORMVALUES },
});

const router = useRouter();
const { triggerSuccess, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
  try {
    const response = await updatePassword(values);

    if (!response || response.status < 200 || response.status >= 300) {
      triggerError('Error al actualizar la producto');
    } else {
      triggerSuccess('contraseña actualizado con exito');
      router.back();
    }
  } catch (error: any) {
    if (error.response) {
      triggerError(error.response.data.message || 'Error en la autenticación');
    } else {
      triggerError('Error en la autenticación');
    }
  }
});
</script>
