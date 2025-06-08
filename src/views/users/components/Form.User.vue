<template>
  <SideBar>
    <DangerAlert :show="showError" :message="alertMessage" />
    <div class="flex justify-center items-center min-h-screen">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="h-full">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">
            Editar tu usuario
          </h2>
          <div class="grid justify-center gap-6">
            <InputFile
              type="file"
              acceptFormat="solo se aceptan .jpg .png .jpeg"
              id="profile_image"
              @change="handleFileChange"
            />
          </div>
          <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
            <FieldForm name="name" label="Nombre" id="name" />
            <FieldForm name="email" label="Email" id="email" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { useAlert } from '@/composables/';
import { useAuthStore } from '@/stores/';
import {
  SideBar,
  Card,
  FieldForm,
  InputFile,
  AcceptButton,
  CancelButton,
  DangerAlert,
} from '@/components/';
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

const profileImageFile = ref<File | null>(null);

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target && target.files && target.files.length > 0) {
    const file = target.files[0];
    profileImageFile.value = file;
  } else {
    profileImageFile.value = null;
  }
};

const router = useRouter();
const { showError, alertMessage, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
  const formData = new FormData();

  formData.append('name', values.getName());
  formData.append('email', values.getEmail());

  if (profileImageFile.value) {
    formData.append('profile_image', profileImageFile.value);
  }

  const response = await updateUser(formData);

  if (response.user) {
    authStore.setUser(response.user);
  } else {
    triggerError('Error al actualizar el usuario');
  }
});
</script>
