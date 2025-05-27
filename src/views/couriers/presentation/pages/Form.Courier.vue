<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">
            Información del Repartidor
          </h2>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FieldForm label="Nombre" name="firstName" id="firstName" required />
            <FieldForm label="Apellido" name="lastName" id="lastName" required />
          </div>
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
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { SideBar, Card, FieldForm, AcceptButton, CancelButton } from '@/components';
import { Courier } from '@/views/couriers/domain/Courier';
import { CourierSchema } from '@/views/couriers/schemas/Courier.Schema';
import {
  GetCourierByIdUseCase,
  CreateCourierUseCase,
  UpdateCourierUseCase,
} from '@/views/couriers/use-cases/';
import { CourierRepositoryImpl } from '@/views/couriers/infrastructure/Courier.RepositoryImpl';
import { mapFormToCourier } from '@/views/couriers/adapters/Courier.FormAdapter';
import { AppRoutesCourier } from '@/views/couriers/presentation/routes/';

const router = useRouter();
const route = useRoute();
const courierId = route.params.id as string;

const repository = new CourierRepositoryImpl();
const getCourierById = new GetCourierByIdUseCase(repository);
const createCourierUseCase = new CreateCourierUseCase(repository);
const updateCourierUseCase = new UpdateCourierUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<Courier>({
  id: courierId,
  getById: async (id) => {
    const courier = await getCourierById.execute(id);
    if (!courier) throw new Error('Courier not found');
    return courier;
  },
  create: (formValues) => {
    const courier = mapFormToCourier(formValues);
    return createCourierUseCase.execute(courier);
  },
  update: (formValues, id) => {
    const courier = mapFormToCourier({ ...formValues, id });
    return updateCourierUseCase.execute(id, courier);
  },
  defaultRoute: AppRoutesCourier.list,
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

onMounted(initializeForm);
</script>
