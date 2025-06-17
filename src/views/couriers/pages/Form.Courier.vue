<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <LoadingSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del Repartidor</h2>
          <FieldForm label="Nombre" name="firstName" id="firstName" required />
          <FieldForm label="Apellido" name="lastName" id="lastName" required />
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
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { SideBar, Card, FieldForm, AcceptButton, CancelButton, LoadingSkeleton } from '@/components';
import { Courier } from '@/views/couriers/models';
import { CourierSchema } from '@/views/couriers/schema';
import { getCourierById, createCourier, updateCourier } from '@/views/couriers/services';

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const courierId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Courier>({
  id: courierId,
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
