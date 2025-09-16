<template>
  <SideBar>
    <BackButton />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-6xl mx-auto p-4 md:p-6">
        <LoadingAbsoluteSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="h-full">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <option value="general">General</option>
              <option value="client">Cliente</option>
              <option value="receipt">Persona a recibir</option>
              <option value="notes">Notas</option>
            </template>
            <template #desktop>
              <TabsTitle tab="general" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <FileText class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">General</span>
              </TabsTitle>
              <TabsTitle tab="client" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">Cliente</span>
              </TabsTitle>
              <TabsTitle tab="receipt" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">Persona a recibir</span>
              </TabsTitle>
              <TabsTitle tab="notes" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">Notas</span>
              </TabsTitle>
            </template>
          </Tabs>
          <TabsContent tab="general" :activeTab="activeTab">
            <div class="space-y-4">
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <FieldForm type="date" label="fecha" name="date" id="date" required />
                <SelectForm label="Servicio" name="service_id" placeholder="Selecciona un servicio" :items="serviceOptions" />
                <SelectForm label="Repartidor" name="courier_id" placeholder="Selecciona un repartidor" :items="courierOptions" />
              </div>
            </div>
          </TabsContent>
          <tabs-content tab="client" :active-tab="activeTab">
            <ClientTypeSelector
              v-model="clientTypeSelection"
              :is_edit_mode="isEditMode"
              :client_id="values.client_id"
              :client_source="client_name_source"
            />
            <ClientSelector
              v-if="clientTypeSelection === 'regular'"
              :modelValue="clientSelectorValue"
              :formDelivery="values"
              @update:modelValue="handleClientSelectorUpdate"
            />
            <AnonymousClientForm v-if="clientTypeSelection === 'anonymous'" :clientType="clientTypeSelection" />
          </tabs-content>
          <TabsContent tab="receipt" :activeTab="activeTab">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldForm label="Nombre completo" name="receipt.full_name" id="fullName" required />
                <FieldForm label="Teléfono" name="receipt.phone" id="phone" required />
              </div>
              <div class="w-full">
                <FieldForm label="Dirección" name="receipt.address" id="receipt.address" required />
              </div>
            </div>
          </TabsContent>
          <TabsContent tab="notes" :activeTab="activeTab">
            <div class="space-y-4">
              <TextAreaForm name="notes" label="Notas" id="notes" placeholder="Ingresa cualquier información adicional sobre la entrega..." />
            </div>
          </TabsContent>
          <div class="mt-6 pt-4 border-t">
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-2 sm:justify-end">
              <CancelButton @click="router.back()" class="w-full sm:w-auto order-2 sm:order-1" />
              <AcceptButton :disabled="!meta.valid" class="w-full sm:w-auto order-1 sm:order-2" />
            </div>
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVeeForm } from '@/composables';
import { FileText, NotebookPen } from 'lucide-vue-next';
import {
  AcceptButton,
  BackButton,
  CancelButton,
  Card,
  FieldForm,
  LoadingAbsoluteSkeleton,
  SelectForm,
  SideBar,
  Tabs,
  TabsContent,
  TabsTitle,
  TextAreaForm,
} from '@/components';
import { FormDelivery } from '@views/deliveries/models';
import { createDelivery, getDeliveryById, updateDelivery } from '@views/deliveries/services';
import { DeliverySchema } from '@views/deliveries/schema';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { getAllCouriers, ListCourier } from '@views/couriers';
import { getAllServices, ListService } from '@views/services';
import ClientSelector from '../components/form/ClientSelectorForm.Delivery.vue';
import AnonymousClientForm from '../components/form/AnonymousClientForm.vue';
import ClientTypeSelector from '../components/form/ClientTypeSelector.vue';
import { ClientType } from '@views/clients';

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const deliveryId = route.params.id as string;
const formReady = ref(false);
const clientTypeSelection = ref<'regular' | 'anonymous'>('regular');
const isEditMode = computed(() => !!deliveryId);
const client_name_source = ref<string>('');

const { initializeForm, onSubmit, meta, setFieldValue, values } = useVeeForm<FormDelivery>({
  id: deliveryId,
  getById: getDeliveryById,
  create: createDelivery,
  update: updateDelivery,
  defaultRoute: AppRoutesDelivery.list,
  messages: {
    createError: 'Error al crear el delivery',
    updateError: 'Error al actualizar el delivery',
    createSuccess: 'Delivery creado correctamente',
    updateSuccess: 'Delivery actualizado correctamente',
  },
  validation: {
    schema: DeliverySchema,
    initialValues: {},
  },
});

async function loadFormData(): Promise<void> {
  const [courierData, serviceData] = await Promise.all([getAllCouriers(), getAllServices()]);

  couriers.value = Array.isArray(courierData) ? courierData : [courierData];
  services.value = Array.isArray(serviceData) ? serviceData : [];
}

onMounted(async () => {
  await loadFormData();
  await initializeForm();

  if (!isEditMode.value) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const localDateString = `${year}-${month}-${day}`;

    setFieldValue('date', localDateString as unknown as Date);
  }

  await nextTick();

  const hasClientId = values.client_id !== null && values.client_id !== undefined && values.client_id !== '';
  const hasAnonymousClient = values.anonymous_client && values.anonymous_client.legal_name;

  if (hasClientId) {
    clientTypeSelection.value = 'regular';
  } else if (hasAnonymousClient) {
    clientTypeSelection.value = 'anonymous';
  }

  formReady.value = true;
});

const couriers = ref<ListCourier[]>([]);
const courierOptions = computed(() =>
  couriers.value.map((courier) => ({
    label: `${courier.first_name} ${courier.last_name}`,
    value: courier.id,
  }))
);

const services = ref<ListService[]>([]);
const serviceOptions = computed(() =>
  services.value.map((service) => ({
    label: `${service.name} - ( ${service.amount.toFixed(2)} )`,
    value: service.id,
  }))
);

const clientSelectorValue = computed(() => ({
  client_id: values.client_id || '',
  pickup_address: values.pickup_address || '',
}));

function handleClientSelectorUpdate(clientData: { client_id?: string; pickup_address?: string }) {
  if (clientData.client_id !== undefined) {
    setFieldValue('client_id', clientData.client_id);

    if (clientData.pickup_address !== undefined) {
      setFieldValue('pickup_address', clientData.pickup_address);
    }
  }
}

watch(clientTypeSelection, (newType, oldType) => {
  if (newType === 'regular') {
    setFieldValue('anonymous_client.legal_name', '');
    setFieldValue('anonymous_client.type', ClientType.VENEZOLANO);
    setFieldValue('anonymous_client.registration_number', '');
    setFieldValue('anonymous_client.phone', '');
  } else {
    setFieldValue('client_id', '');
  }
});
</script>
