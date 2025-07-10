<template>
  <div class="space-y-4 mb-6 px-4 sm:px-0">
    <div class="space-y-4 border p-4 rounded-md mb-4">
      <div v-if="!selectedClient" class="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
        <p class="text-sm text-yellow-800 dark:text-yellow-600">Por favor, seleccione un cliente para habilitar las opciones adicionales.</p>
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente</label>
        <div class="relative">
          <input
            v-model="clientSearchQuery"
            type="text"
            placeholder="Buscar cliente..."
            class="text-black lg:mb-6 dark:text-white w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 h-10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-800"
            @focus="showClientDropdown = true"
            @blur="handleClientBlur"
          />
          <div
            v-if="showClientDropdown && filteredClients.length > 0"
            class="text-black dark:text-white absolute top-12 z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            <div
              v-for="client in filteredClients"
              :key="client.value"
              @mousedown.prevent="selectClient(client)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base"
            >
              {{ client.label }}
            </div>
          </div>
          <div
            v-if="showClientDropdown && filteredClients.length === 0 && clientSearchQuery.trim() !== ''"
            class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg"
          >
            <div class="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">No se encontraron clientes</div>
          </div>
        </div>
      </div>
      <div class="lg:col-span-1">
        <div class="space-y-2">
          <SelectForm
            v-if="!showAddressForm"
            label="Dirección de recogida"
            name="pickupAddress"
            placeholder="Selecciona una dirección"
            :items="addressOptionsWithAdd"
            :modelValue="props.modelValue?.pickupAddress || ''"
            @update:modelValue="handleAddressSelection"
            :disabled="!selectedClient"
          />
          <div v-if="showAddressForm" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nueva Dirección</label>
            <div class="space-y-3">
              <input
                v-model="newAddress"
                type="text"
                placeholder="Dirección completa"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-10 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed dark:disabled:bg-gray-800"
                @keyup.enter="saveNewAddress"
                :disabled="!selectedClient"
              />
              <div class="flex flex-col sm:flex-row">
                <button
                  type="button"
                  @click="saveNewAddress"
                  :disabled="!newAddress.trim() || !selectedClient"
                  class="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  @click="cancelAddAddress"
                  :disabled="!selectedClient"
                  class="flex-1 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:items-end">
          <SelectForm
            label="Dirección de recogida"
            name="pickupAddress"
            placeholder="Selecciona una dirección"
            :items="addressOptionsWithAdd"
            :disabled="!selectedClient"
          />
          <SelectForm
            label="Forma de pago"
            name="payment_type"
            placeholder="Forma de pago"
            :items="[...PaymentTypeOptions]"
            :disabled="!selectedClient"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { SelectForm } from '@/components';
import { ListClient } from '@views/clients/models';
import { FormDelivery, PaymentTypeOptions } from '@/views/deliveries/models';
import { getAllClients, getClientById } from '@views/clients/service';
import { ClientAddress } from '@views/clients';

interface Props {
  modelValue?: {
    clientId?: string;
    pickupAddress?: string;
  };
  formDelivery?: FormDelivery;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
});

interface Emits {
  (e: 'update:modelValue', value: { clientId?: string; pickupAddress?: string }): void;

  (e: 'clientChanged', client: ListClient | null): void;
}

const emit = defineEmits<Emits>();

const isModalClientFormOpen = ref(false);
const showAddressForm = ref(false);
const showClientDropdown = ref(false);
const clientSearchQuery = ref('');
const newAddress = ref('');
const clients = ref<ListClient[]>([]);
const clientAddresses = ref<Array<{ label: string; value: string }>>([]);
const selectedClient = ref<ListClient | null>(null);

const clientsOptions = computed(() =>
  clients.value.map((client) => ({
    label: `${client.legal_name} - ${client.registration_number}`,
    value: client.id,
  }))
);

const filteredClients = computed(() => {
  if (!clientSearchQuery.value.trim()) return clientsOptions.value;

  const searchTerm = clientSearchQuery.value.toLowerCase().trim();
  return clientsOptions.value.filter((client) => client.label.toLowerCase().includes(searchTerm));
});

const addressOptionsWithAdd = computed(() => {
  const options = [...clientAddresses.value];

  if (props.modelValue?.pickupAddress && props.modelValue.pickupAddress !== '') {
    const currentAddress = props.modelValue.pickupAddress;
    const addressExists = options.some((addr) => addr.value === currentAddress);

    if (!addressExists) {
      options.push({
        label: currentAddress,
        value: currentAddress,
      });
    }
  }

  if (selectedClient.value) {
    options.push({
      label: '+ Agregar nueva dirección',
      value: '__ADD_NEW__',
    });
  }

  return options;
});

function updateValue(updates: Partial<{ clientId?: string; pickupAddress?: string }>) {
  emit('update:modelValue', { ...props.modelValue, ...updates });
}

function selectClient(client: { label: string; value: string }) {
  clientSearchQuery.value = client.label;
  showClientDropdown.value = false;

  const clientData = clients.value.find((c) => c.id === client.value);
  selectedClient.value = clientData || null;

  const currentPickupAddress = props.modelValue?.pickupAddress || '';
  updateValue({ clientId: client.value, pickupAddress: currentPickupAddress });

  loadAddresses(client.value).then(() => {
    if (currentPickupAddress && currentPickupAddress !== '') {
      const addressExists = clientAddresses.value.some((addr) => addr.value === currentPickupAddress);
      if (!addressExists) {
        clientAddresses.value.push({
          label: currentPickupAddress,
          value: currentPickupAddress,
        });
      }
    }
  });

  emit('clientChanged', clientData || null);
}

function handleClientBlur() {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 150);
}

async function loadAddresses(clientId: string) {
  try {
    const clientDetail = await getClientById(clientId);
    clientAddresses.value =
      clientDetail?.addresses?.map((address: ClientAddress) => ({
        label: address.address,
        value: address.address,
      })) || [];
  } catch (error) {
    console.error('Error loading client addresses:', error);
    clientAddresses.value = [];
  }
}

function handleAddressSelection(addressValue: string) {
  if (!selectedClient.value) return;

  if (addressValue === '__ADD_NEW__') {
    showAddressForm.value = true;
    updateValue({ pickupAddress: '' });
  } else {
    showAddressForm.value = false;
    updateValue({ pickupAddress: addressValue });
  }
}

function handleManualAddress(address: string) {
  if (!address.trim() || !selectedClient.value) return;

  const addressData = {
    label: address.trim(),
    value: address.trim(),
  };

  if (!clientAddresses.value.some((addr) => addr.value === addressData.value)) {
    clientAddresses.value.push(addressData);
  }

  updateValue({ pickupAddress: addressData.value });
}

async function saveNewAddress() {
  if (!newAddress.value.trim() || !selectedClient.value) return;

  handleManualAddress(newAddress.value);

  showAddressForm.value = false;
  newAddress.value = '';
  clients.value = await getAllClients();
}

function cancelAddAddress() {
  showAddressForm.value = false;
  newAddress.value = '';
}

async function handleAddClient(newClient: ListClient) {
  try {
    clients.value = await getAllClients();
    selectedClient.value = newClient;
    clientSearchQuery.value = newClient.legal_name;

    await loadAddresses(newClient.id);
    await nextTick();

    const firstAddress = clientAddresses.value[0]?.value || '';

    updateValue({
      clientId: newClient.id,
      pickupAddress: firstAddress,
    });

    emit('clientChanged', newClient);
    isModalClientFormOpen.value = false;
  } catch (error) {
    console.error('Error al manejar el nuevo cliente:', error);
  }
}

async function loadClients() {
  try {
    clients.value = await getAllClients();
  } catch (error) {
    console.error('Error al cargar clientes:', error);
  }
}

watch(
  () => props.modelValue?.clientId,
  async (clientId) => {
    if (clientId && clients.value.length > 0) {
      const client = clients.value.find((c) => c.id === clientId);
      if (client) {
        selectedClient.value = client;
        clientSearchQuery.value = client.legal_name;
        await loadAddresses(clientId);
        emit('clientChanged', client);
      }
    } else {
      selectedClient.value = null;
      clientSearchQuery.value = '';
    }
  },
  { immediate: true }
);

watch(
  () => props.modelValue?.pickupAddress,
  (pickupAddress) => {
    if (pickupAddress && pickupAddress !== '') {
      const addressExists = clientAddresses.value.some((addr) => addr.value === pickupAddress);
      if (!addressExists) {
        clientAddresses.value.push({
          label: pickupAddress,
          value: pickupAddress,
        });
      }
      updateValue({ pickupAddress });
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await loadClients();

  if (props.modelValue?.pickupAddress && props.modelValue.pickupAddress !== '') {
    const pickupAddress = props.modelValue.pickupAddress;
    const addressExists = clientAddresses.value.some((addr) => addr.value === pickupAddress);

    if (!addressExists) {
      clientAddresses.value.push({
        label: pickupAddress,
        value: pickupAddress,
      });
    }
  }
});

defineExpose({
  loadClients,
});
</script>
