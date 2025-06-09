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
              <TabsTitle
                tab="general"
                :activeTab="activeTab"
                @update:activeTab="activeTab = $event"
              >
                <FileText class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base">General</span>
              </TabsTitle>
              <TabsTitle
                tab="receipt"
                :activeTab="activeTab"
                @update:activeTab="activeTab = $event"
              >
                <NotebookPen class="w-4 h-4 dark:text-white" />
                <span class="ml-2 md:ml-4 dark:text-white text-sm md:text-base"
                  >Persona a recibir</span
                >
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
                <div class="flex items-center justify-center w-full">
                  <PlusButton @click="openModalClientForm" class="w-full md:w-auto">
                    <span class="text-white ml-2 text-sm md:text-base">Agregar Cliente</span>
                  </PlusButton>
                </div>
              </div>
            </div>
            <div class="space-y-4">
              <h3 class="text-lg font-semibold dark:text-white border-b pb-2">
                Detalles del Servicio
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <SelectForm
                  label="Servicio"
                  name="serviceId"
                  placeholder="Selecciona un servicio"
                  :items="serviceOptions"
                />
                <SelectForm
                  label="Forma de pago"
                  name="paymentType"
                  placeholder="Forma de pago"
                  :items="[...PaymentTypeOptions]"
                  :disabled="selectedClientAllowCredit"
                />
                <div class="sm:col-span-2 lg:col-span-1">
                  <SelectForm
                    label="Repartidor"
                    name="courierId"
                    placeholder="Selecciona un repartidor"
                    :items="courierOptions"
                  />
                </div>
              </div>
            </div>
            <DeliveryClientModalForm
              :isOpen="isModalClientFormOpen"
              @close="closeModalClientForm"
              @addClient="handleAddClient"
            />
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
              <TextAreaForm
                label="Notas"
                id="notes"
                placeholder="Ingresa cualquier información adicional sobre la entrega..."
              />
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
import { CourierRepositoryImpl } from '@/views/couriers/infrastructure/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/';
import { ServiceRepositoryImpl } from '@/views/services/infrastructure/';
import { GetCouriersUseCase } from '@/views/couriers/use-cases/';
import { GetClientsUseCase } from '@/views/clients/use-cases/';
import { GetServicesUseCase } from '@/views/services/use-cases/';
import { Delivery } from '@/views/deliveries/domain/Delivery';
import { PaymentType, PaymentTypeOptions } from '@views/deliveries/domain';
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
import { createDeliveryFormDefaults } from '@views/deliveries/factory/DeliveryFactory';

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

const selectedClientAllowCredit = ref(true);

const { initializeForm, onSubmit, meta, setFieldValue, values } = useVeeForm<Delivery>({
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
    initialValues: createDeliveryFormDefaults(),
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

    if (client.getAllowCredit()) {
      selectedClientAllowCredit.value = false;
    } else {
      selectedClientAllowCredit.value = true;
    }

    clientsAddressOptions.value = addresses.map((address) => ({
      label: address.getAddress(),
      value: address.getId(),
    }));
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
