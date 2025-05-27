<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-screen">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="h-full">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <option value="general">General</option>
              <option value="receipt">Cliente a recibir</option>
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
                <span class="m-4 dark:text-white">Cliente a recibir</span>
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
                :items="PAYMENT_SELECT"
              />
            </div>
            <div class="flex flex-row gap-6 mb-8">
              <FieldSelectorForm
                label="Cliente"
                name="clientId"
                id="clientId"
                placeholder="Selecciona un cliente"
                :isOpen="isClientOpen"
                :selectedValue="clientId"
                :displayValue="selectedClientName"
                @toggle="toggleClientSelector"
              >
                <ContentFieldSelectorForm
                  :items="clients"
                  displayKey="legalName"
                  :selectedValue="clientId"
                  @update="handleSelectClient"
                />
              </FieldSelectorForm>
              <FieldSelectorForm
                label="Dirección"
                name="clientAddressId"
                id="clientAddressId"
                placeholder="Selecciona una dirección"
                :isOpen="isAddressOpen"
                :selectedValue="addressId"
                :displayValue="selectedAddressText"
                @toggle="toggleAddressSelector"
              >
                <ContentFieldSelectorForm
                  :items="addresses"
                  displayKey="address"
                  :selectedValue="addressId"
                  @update="handleSelectAddress"
                />
              </FieldSelectorForm>
              <div class="flex items-center justify-center m-auto mt-4">
                <PlusButton @click="openModalClientForm" />
              </div>
              <DeliveryClientModalForm
                :isOpen="isModalClientFormOpen"
                @close="closeModalClientForm"
                @addClient="handleAddClient"
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
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { FileText, NotebookPen } from 'lucide-vue-next';
import { useVeeForm } from '@/composables/';
import {
  SideBar,
  Card,
  Tabs,
  TabsContent,
  TabsTitle,
  FieldForm,
  FieldSelectorForm,
  SelectForm,
  ContentFieldSelectorForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
  PlusButton,
} from '@/components/';
import {
  Delivery,
  DeliverySchema,
  deliveryAppRoutes,
  DELIVERY_DEFAULT_FORM_VALUE,
  getDelivery,
  postDeliveries,
  putDeliveries,
  PAYMENT_SELECT,
} from '@/views/deliveries/';
import { DeliveryClientModalForm } from '@/views/deliveries/components/';
import { Client, ClientAddress, getClients } from '@/views/clients/';

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const deliveryId = route.params.id as string;

const { initializeForm, onSubmit, meta, setFieldValue, values, errors } = useVeeForm<Delivery>({
  id: deliveryId,
  getById: getDelivery,
  create: postDeliveries,
  update: putDeliveries,
  defaultRoute: deliveryAppRoutes.list,
  messages: {
    createError: 'Error al crear el delivery',
    updateError: 'Error al actualizar el delivery',
    createSuccess: 'Delivery creado correctamente',
    updateSuccess: 'Delivery actualizado correctamente',
  },
  validation: {
    schema: DeliverySchema,
    initialValues: DELIVERY_DEFAULT_FORM_VALUE,
  },
});

/*const couriers = ref<Courier[]>([]);
const courierOptions = computed(() =>
  couriers.value.map((courier) => ({
    label: `${courier.firstName} ${courier.lastName}`,
    value: courier.id,
  }))
);*/
/*
const services = ref<Service[]>([]);
const serviceOptions = computed(() =>
  services.value.map((service) => ({
    label: service.name,
    value: service.id,
  }))
);*/

const clientId = ref<string>('');
const addressId = ref<string>('');
const clients = ref<Client[]>([]);

const selectedClientName = computed(
  () => clients.value.find((c) => c.id === clientId.value)?.legalName || ''
);
const selectedAddressText = computed(
  () => addresses.value.find((a) => a.id === addressId.value)?.address || ''
);

const addresses = computed<ClientAddress[]>(() => {
  const client = clients.value.find((c) => c.id === clientId.value);
  return client?.addresses || [];
});

onMounted(async () => {
  await initializeForm();
  const [clientData] = await Promise.all([getClients()]);
  clients.value = clientData;

  clientId.value = values.clientId;
  addressId.value = values.clientAddressId;
});

const isModalClientFormOpen = ref(false);

function openModalClientForm() {
  isModalClientFormOpen.value = true;
}

function closeModalClientForm() {
  isModalClientFormOpen.value = false;
}

const isClientOpen = ref(false);
const isAddressOpen = ref(false);

function handleSelectClient(client: Record<string, any>) {
  clientId.value = client.id;
  setFieldValue('clientId', client.id);

  if (client.addresses && client.addresses.length > 0) {
    addressId.value = client.addresses[0].id;
    setFieldValue('clientAddressId', client.addresses[0].id);
  } else {
    addressId.value = '';
    setFieldValue('clientAddressId', '');
  }
  isClientOpen.value = false;
}

async function handleAddClient(newClient: Client) {
  clients.value = await getClients();
  handleSelectClient(newClient);
  closeModalClientForm();
}

function handleSelectAddress(address: Record<string, any>) {
  addressId.value = address.id;
  setFieldValue('clientAddressId', address.id);
  isAddressOpen.value = false;
}

function toggleClientSelector() {
  isClientOpen.value = !isClientOpen.value;
  isAddressOpen.value = false;
}

function toggleAddressSelector() {
  isAddressOpen.value = !isAddressOpen.value;
  isClientOpen.value = false;
}
</script>
