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
                label="Servicio"
                name="serviceId"
                placeholder="Selecciona un servicio"
                :items="serviceOptions"
              />
              <SelectForm
                label="Forma de pago"
                name="paymentType"
                placeholder="Selecciona una forma de pago"
                :items="[...PaymentTypeOptions]"
              />
              <SelectForm
                label="Repartidor"
                name="courierId"
                placeholder="Selecciona un repartidor"
                :items="courierOptions"
              />
            </div>
            <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
              <SelectForm
                label="Cliente"
                name="clientId"
                placeholder="Selecciona un Cliente"
                :items="clientsOptions"
                @update:modelValue="loadAddress"
              />
              <SelectForm
                label="Direccion de recogida"
                name="clientAddressId"
                placeholder="Selecciona un direccion de recogida"
                :items="clientsAddressOptions"
              />
              <div class="flex items-center justify-center m-auto mt-4">
                <PlusButton @click="openModalClientForm">
                  <span class="text-white ml-4">Agregar nuevo Cliente</span>
                </PlusButton>
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
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { FileText, NotebookPen } from 'lucide-vue-next';
import { CourierRepositoryImpl } from '@/views/couriers/infrastructure/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/';
import { ServiceRepositoryImpl } from '@/views/services/infrastructure/';
import { GetCouriersUseCase } from '@/views/couriers/use-cases/';
import { GetClientsUseCase } from '@/views/clients/use-cases/';
import { GetServicesUseCase } from '@/views/services/use-cases/';
import { Delivery } from '@/views/deliveries/domain/Delivery';
import { PaymentTypeOptions } from '@views/deliveries/domain';
import { DeliverySchema } from '@/views/deliveries/schemas';
import {
  GetDeliveryByIdUseCase,
  CreateDeliveryUseCase,
  UpdateDeliveryUseCase,
} from '@/views/deliveries/use-cases/';
import { DeliveryRepositoryImpl } from '@/views/deliveries/infrastructure/Delivery.RepositoryImpl';
import { mapFormToDelivery } from '@views/deliveries/adapters/form/Delivery.FormAdapter';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes';
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
import { DeliveryClientModalForm } from '@/views/deliveries/presentation/components';
import { Courier } from '@views/couriers/domain/Courier';
import { Client } from '@views/clients/domain/';
import { Service } from '@views/services/domain/service/Service';

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const deliveryId = route.params.id as string;

const courierRepository = new CourierRepositoryImpl();
const clientRepository = new ClientRepositoryImpl();
const serviceRepository = new ServiceRepositoryImpl();
const deliveryRepository = new DeliveryRepositoryImpl();

const getAllCouriers = new GetCouriersUseCase(courierRepository);
const getAllClients = new GetClientsUseCase(clientRepository);
const getAllServices = new GetServicesUseCase(serviceRepository);

const getDeliveryById = new GetDeliveryByIdUseCase(deliveryRepository);
const createDeliveryUseCase = new CreateDeliveryUseCase(deliveryRepository);
const updateDeliveryUseCase = new UpdateDeliveryUseCase(deliveryRepository);

const couriers = ref<Courier[]>([]);
const clients = ref<Client[]>([]);
const services = ref<Service[]>([]);

const isModalClientFormOpen = ref(false);

const currentDelivery = ref<Delivery | null>(null);

const { initializeForm, onSubmit, meta } = useVeeForm<Delivery>({
  id: deliveryId,
  getById: async (id) => {
    const delivery = await getDeliveryById.execute(id);
    if (!delivery) throw new Error('Orden no encontrada');
    currentDelivery.value = delivery;
    return delivery;
  },
  create: (formValues) => {
    const delivery = mapFormToDelivery(formValues);
    return createDeliveryUseCase.execute(delivery);
  },
  update: (formValues, id) => {
    const delivery = mapFormToDelivery({ ...formValues, id });
    return updateDeliveryUseCase.execute(id, delivery);
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

const courierOptions = computed(() =>
  couriers.value.map((courier) => ({
    label: courier.getFullName(),
    value: courier.getId(),
  }))
);

const serviceOptions = computed(() =>
  services.value.map((service) => ({
    label: service.getName(),
    value: service.getId(),
  }))
);

const clientsOptions = computed(() =>
  clients.value.map((client) => ({
    label: client.getLegalName(),
    value: client.getId(),
  }))
);

const clientsAddressOptions = ref<Array<{ label: string; value: string }>>([]);

function loadAddress(clientId: string) {
  const client = clients.value.find((c) => c.getId() === clientId);
  if (client) {
    const addresses = client.getAddresses();

    clientsAddressOptions.value = addresses.map((address) => ({
      label: address.getAddress(),
      value: address.getId(),
    }));
  } else {
    return;
  }
}

async function loadFormData() {
  couriers.value = await getAllCouriers.execute();
  clients.value = await getAllClients.execute();
  services.value = await getAllServices.execute();
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
  clients.value = await getAllClients.execute();
  closeModalClientForm();
}
</script>
