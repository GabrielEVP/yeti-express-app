<template>
  <SideBar>
    <BackButton />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <LoadingAbsoluteSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del Repartidor</h2>
          <FieldForm label="Nombre" name="first_name" id="first_name" required />
          <FieldForm label="Apellido" name="last_name" id="last_name" required />
          <FieldForm label="Teléfono" name="phone" id="phone" required />
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
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVeeForm } from '@/composables';
import { AcceptButton, BackButton, CancelButton, Card, FieldForm, LoadingAbsoluteSkeleton, SideBar } from '@/components';
import { FormCourier } from '@/views/couriers/models';
import { CourierSchema } from '@/views/couriers/schema';
import { createCourier, getCourierById, updateCourier } from '@/views/couriers/services';

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const courier_id = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<FormCourier>({
  id: courier_id,
  getById: getCourierById,
  create: createCourier,
  update: (values, id) => updateCourier(values, id),
  defaultRoute: '/couriers',
  messages: {
    createError: 'Error al crear el repartidor',
    updateError: 'Error al actualizar el repartidor',
    createSuccess: 'Repartidor creado correctamente',
    updateSuccess: 'Repartidor actualizado correctamente',
  },
  validation: {
    schema: CourierSchema,
    initialValues: {},
  },
});

onMounted(async () => {
  await initializeForm();

  await nextTick();
  formReady.value = true;
});
</script>
