<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-screen p-4">
      <Card class="w-full max-w-6xl mx-auto p-4 md:p-6">
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
            <div class="space-y-4 mb-6">
              <h3 class="text-lg font-semibold dark:text-white border-b pb-2">Cliente</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div class="md:col-span-1">
                  <SelectForm
                    label="Cliente"
                    name="clientId"
                    placeholder="Selecciona un Cliente"
                    :items="clientsOptions"
                    @update:modelValue="loadAddress"
                  />
                </div>
                <div class="md:col-span-1">
                  <SelectForm
                    label="Dirección de recogida"
                    name="clientAddressId"
                    placeholder="Selecciona una dirección"
                    :items="clientsAddressOptions"
                  />
                </div>
                <div class="flex items-center justify-center w-full col-span-2 xl:col-span-1">
                  <PlusButton @click="openModalClientForm" class="w-full justify-center xl:w-auto">
                    <span class="text-white ml-2 text-sm md:text-base">Agregar Cliente</span>
                  </PlusButton>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold dark:text-white border-b pb-2">Detalles del Servicio</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectForm label="Servicio" name="serviceId" placeholder="Selecciona un servicio" :items="serviceOptions" />
                <SelectForm
                  label="Forma de pago"
                  name="paymentType"
                  placeholder="Forma de pago"
                  :items="[...PaymentTypeOptions]"
                  :disabled="selectedClientAllowCredit"
                />
                <div class="sm:col-span-2 lg:col-span-1">
                  <SelectForm label="Repartidor" name="courierId" placeholder="Selecciona un repartidor" :items="courierOptions" />
                </div>
              </div>
            </div>
            <DeliveryClientModalForm :isOpen="isModalClientFormOpen" @close="closeModalClientForm" @addClient="handleAddClient" />
          </TabsContent>
          <TabsContent tab="receipt" :activeTab="activeTab">
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FieldForm label="Nombre completo" name="receipt.fullName" id="fullName" required />
                <FieldForm label="Teléfono" name="receipt.phone" id="phone" required />
              </div>
              <div class="w-full">
                <FieldForm label="Dirección" name="receipt.address" id="receipt.address" required />
              </div>
            </div>
          </TabsContent>

          <TabsContent tab="notes" :activeTab="activeTab">
            <div class="space-y-4">
              <TextAreaForm label="Notas" id="notes" placeholder="Ingresa cualquier información adicional sobre la entrega..." />
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
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { FileText, NotebookPen } from 'lucide-vue-next';
import {
  SideBar,
  Card,
  FieldForm,
  SelectForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
  PlusButton,
  Tabs,
  TabsTitle,
  TabsContent,
} from '@/components';
import { Delivery } from '@views/deliveries/models';
import { PaymentTypeOptions } from '@views/deliveries/models';
import { getDeliveryById, createDelivery, updateDelivery } from '../services/Delivery.api';
import { DeliverySchema } from '@views/deliveries/schema';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { DeliveryClientModalForm } from '@views/deliveries/components';
import { Client } from '@views/clients';
import { getAllClients } from '@views/clients';
import { Courier } from '@views/couriers';
import { getAllCouriers } from '@views/couriers';
import { Service } from '@views/services';
import { getAllServices } from '@views/services';

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const deliveryId = route.params.id as string;

const isModalClientFormOpen = ref(false);

const selectedClientAllowCredit = ref(true);

const { initializeForm, onSubmit, meta, setFieldValue, values } = useVeeForm<Delivery>({
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

const couriers = ref<Courier[]>([]);
const courierOptions = computed(() =>
  couriers.value.map((courier) => ({
    label: `${courier.firstName} ${courier.lastName}`,
    value: courier.id,
  }))
);

const services = ref<Service[]>([]);
const serviceOptions = computed(() =>
  services.value.map((service) => ({
    label: service.name,
    value: service.id,
  }))
);
const clients = ref<Client[]>([]);
const clientsOptions = computed(() =>
  clients.value.map((client) => ({
    label: client.legalName,
    value: client.id,
  }))
);

const clientsAddressOptions = ref<Array<{ label: string; value: string }>>([]);

function loadAddress(clientId: string) {
  const client = clients.value.find((c) => c.id === clientId);
  if (client) {
    const addresses = client.addresses;

    if (client.allowCredit) {
      selectedClientAllowCredit.value = false;
    } else {
      selectedClientAllowCredit.value = true;
    }

    clientsAddressOptions.value = addresses.map((address) => ({
      label: address.address,
      value: address.id,
    }));
  }
}
const clientId = ref<string>('');
const addressId = ref<string>('');
async function loadFormData() {
  await initializeForm();
  const [courierData, clientData, serviceData] = await Promise.all([getAllCouriers(), getAllClients(), getAllServices()]);
  couriers.value = courierData;
  clients.value = clientData;
  services.value = serviceData;

  clientId.value = values.clientId;
  addressId.value = values.clientAddressId;
}

onMounted(async () => {
  await loadFormData();
  await initializeForm();
});

function openModalClientForm() {
  isModalClientFormOpen.value = true;
}

function closeModalClientForm() {
  isModalClientFormOpen.value = false;
}

async function handleAddClient(newClient: Client) {
  clients.value = await getAllClients();
  closeModalClientForm();
}
</script>
