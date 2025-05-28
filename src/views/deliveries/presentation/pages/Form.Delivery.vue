<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-screen">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="h-full">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <option value="general">General</option>
              <option value="receipt">Persona a recibir</option>
              <option value="notes">Notas</option>
            </template>
            <template #desktop>
              <TabsTitle
                tab="general"
                :activeTab="activeTab"
                @update:activeTab="activeTab = $event"
              >
                <FileText class="w-4 h-4 dark:text-white" />
                <span class="m-4 dark:text-white">General</span>
              </TabsTitle>
              <TabsTitle
                tab="receipt"
                :activeTab="activeTab"
                @update:activeTab="activeTab = $event"
              >
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="m-4 dark:text-white">Persona a recibir</span>
              </TabsTitle>
              <TabsTitle tab="notes" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="m-4 dark:text-white">Notas</span>
              </TabsTitle>
            </template>
          </Tabs>
          <TabsContent tab="general" :activeTab="activeTab">
            <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
              <SelectForm
                label="Forma de pago"
                name="paymentType"
                placeholder="Selecciona una forma de pago"
                :items="PaymentTypeOptions"
              />
            </div>
          </TabsContent>
          <TabsContent tab="receipt" :activeTab="activeTab">
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
              <FieldForm label="Nombre completo" name="receipt.fullName" id="number" required />
              <FieldForm label="Telefono" name="receipt.phone" id="number" required />
            </div>
            <FieldForm label="Direccion" name="receipt.address" id="receipt.address" required />
          </TabsContent>
          <TabsContent tab="notes" :activeTab="activeTab">
            <TextAreaForm label="Notas" id="notes" rows="32" />
          </TabsContent>
          <div class="space-x-2 flex justify-end">
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
import { FileText, NotebookPen } from 'lucide-vue-next';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import {
  SideBar,
  Card,
  FieldForm,
  SelectForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
  Tabs,
  TabsTitle,
  TabsContent,
} from '@/components';
import { Delivery } from '@/views/deliveries/domain/Delivery';
import { PaymentTypeOptions } from '@views/deliveries/domain';
import { DeliverySchema } from '@/views/deliveries/schemas';
import {
  GetDeliveryByIdUseCase,
  CreateDeliveryUseCase,
  UpdateDeliveryUseCase,
} from '@/views/deliveries/use-cases/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';
import { mapFormToDelivery } from '@/views/deliveries/adapters/Delivery.FormAdapter';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes';

const activeTab = ref('general');

const router = useRouter();
const route = useRoute();
const clientId = route.params.id as string;

const repository = new DeliveryRepositoryImpl();
const getDeliveryById = new GetDeliveryByIdUseCase(repository);
const createDeliveryUseCase = new CreateDeliveryUseCase(repository);
const updateDeliveryUseCase = new UpdateDeliveryUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<Delivery>({
  id: clientId,
  getById: async (id) => {
    const client = await getDeliveryById.execute(id);
    if (!client) throw new Error('Orden no encontrada');
    return client;
  },
  create: (formValues) => {
    const client = mapFormToDelivery(formValues);
    return createDeliveryUseCase.execute(client);
  },
  update: (formValues, id) => {
    const client = mapFormToDelivery({ ...formValues, id });
    return updateDeliveryUseCase.execute(id, client);
  },
  defaultRoute: AppRoutesDelivery.list,
  messages: {
    createError: 'Error al crear el orden',
    updateError: 'Error al actualizar el orden',
    createSuccess: 'Orden creado correctamente',
    updateSuccess: 'Orden actualizado correctamente',
  },
  validation: {
    schema: DeliverySchema,
    initialValues: {},
  },
});

onMounted(initializeForm);
</script>
