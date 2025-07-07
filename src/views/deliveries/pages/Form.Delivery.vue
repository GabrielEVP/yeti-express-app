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
              <option value="receipt">Persona a recibir</option>
              <option value="notes">Notas</option>
            </template>
            <template #desktop>
              <TabsTitle tab="general" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                <FileText class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">General</span>
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
            <ClientSelector :modelValue="clientSelectorValue" @update:modelValue="handleClientSelectorUpdate" @clientChanged="handleClientChanged" />
            <div class="space-y-4">
              <h3 class="text-lg font-semibold dark:text-white border-b pb-2">Detalles del Servicio</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectForm label="Servicio" name="service_id" placeholder="Selecciona un servicio" :items="serviceOptions" />
                <SelectForm label="Forma de pago" name="payment_type" placeholder="Forma de pago" :items="[...PaymentTypeOptions]" />
                <div class="sm:col-span-2 lg:col-span-1">
                  <SelectForm label="Repartidor" name="courier_id" placeholder="Selecciona un repartidor" :items="courierOptions" />
                </div>
              </div>
            </div>
          </TabsContent>
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
import { computed, nextTick, onMounted, ref } from 'vue';
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
import { FormDelivery, PaymentType, PaymentTypeOptions } from '@views/deliveries/models';
import { createDelivery, getDeliveryById, updateDelivery } from '@views/deliveries';
import { DeliverySchema } from '@views/deliveries/schema';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { FormClient } from '@views/clients';
import { getAllCouriers, ListCourier } from '@views/couriers';
import { getAllServices, ListService } from '@views/services';
import ClientSelector from '../components/clients/ClientSelectorForm.Delivery.vue';

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const deliveryId = route.params.id as string;
const formReady = ref(false);

const selectedClientAllowCredit = ref(true);

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
    label: service.name,
    value: service.id,
  }))
);

const clientSelectorValue = computed(() => ({
  clientId: values.client_id || '',
  pickupAddress: values.pickup_address || '',
}));

function handleClientSelectorUpdate(clientData: { clientId?: string; pickupAddress?: string }) {
  if (clientData.clientId !== undefined) {
    setFieldValue('client_id', clientData.clientId);
  }
  if (clientData.pickupAddress !== undefined) {
    setFieldValue('pickup_address', clientData.pickupAddress);
  }
}

function handleClientChanged(client: FormClient | null) {
  if (client) {
    if (client.allow_credit) {
      selectedClientAllowCredit.value = true;
    } else {
      selectedClientAllowCredit.value = false;
      setFieldValue('payment_type', PaymentType.FULL);
    }
  } else {
    selectedClientAllowCredit.value = true;
  }
}

async function loadFormData(): Promise<void> {
  const [courierData, serviceData] = (await Promise.all([getAllCouriers(), getAllServices()])) as [ListCourier, ListService[]];

  couriers.value = [courierData];
  services.value = serviceData;
}

onMounted(async () => {
  await loadFormData();
  await initializeForm();

  await nextTick();
  formReady.value = true;
});
</script>