<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-screen p-4">
      <Card class="w-full max-w-4xl mx-auto p-8 shadow-xl rounded-2xl bg-white dark:bg-gray-800 border-0">
        <form @submit.prevent="onSubmit" class="h-full">
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Editar tu usuario</h2>
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 mb-8">
            <FieldForm name="name" label="Nombre" id="name" />
            <FieldForm name="email" label="Email" id="email" />
          </div>
          <div class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <router-link
              to="/users/changePassword/"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 border border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700"
            >
              <Lock class="h-4 w-4" />
              Cambiar Contraseña
            </router-link>
            <div class="flex space-x-3">
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
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { Lock } from 'lucide-vue-next';
import { useAlert } from '@/composables/';
import { useAuthStore } from '@/stores/';
import { SideBar, Card, FieldForm, AcceptButton, CancelButton } from '@/components/';
import { User, UserSchema, updateUser, USERDEFAULTFORMVALUES } from '@/views/users/';

const { handleSubmit, setValues, meta } = useForm<User>({
  validationSchema: UserSchema,
  initialValues: { ...USERDEFAULTFORMVALUES },
});

const authStore = useAuthStore();
const user = authStore.getUser;

onMounted(() => {
  setValues({ ...user });
});

const router = useRouter();
const { triggerSuccess, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);

    const response = await updateUser(formData);
    if (response.user) {
      authStore.setUser(response.user, 'user');
      triggerSuccess('Usuario actualizado con exito');
      router.back();
    } else {
      triggerError('Error al actualizar el usuario');
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
