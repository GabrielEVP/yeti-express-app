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
      <div class="space-y-2">
        <SelectForm
          v-if="!showAddressForm"
          label="Dirección de recogida"
          name="pickup_address"
          placeholder="Selecciona una dirección"
          :items="addressOptions"
          :modelValue="formData.pickup_address"
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
            <div class="flex flex-col sm:flex-row gap-2">
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
                class="flex-1 bg-gray-500 text-white px-3 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm font-medium transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <SelectForm
        label="Forma de pago"
        name="payment_type"
        placeholder="Forma de pago"
        :items="[...PaymentTypeOptions]"
        :disabled="!selectedClient"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { SelectForm } from '@components';
import { ListClient } from '@views/clients/models';
import { PaymentTypeOptions } from '@views/deliveries/models';
import { getAllClients, getClientById } from '@views/clients/service';
import { ClientAddress } from '@views/clients';

const props = defineProps<{
  modelValue?: {
    client_id?: string;
    pickup_address?: string;
  };
}>();

const emit = defineEmits<{
  'update:modelValue': [value: { client_id?: string; pickup_address?: string }];
  clientChanged: [client: ListClient | null];
}>();

const showAddressForm = ref(false);
const showClientDropdown = ref(false);
const clientSearchQuery = ref('');
const newAddress = ref('');
const clients = ref<ListClient[]>([]);
const clientAddresses = ref<Array<{ label: string; value: string }>>([]);
const selectedClient = ref<ListClient | null>(null);

const formData = computed(() => ({
  client_id: props.modelValue?.client_id || '',
  pickup_address: props.modelValue?.pickup_address || '',
}));

const clientOptions = computed(() =>
  clients.value.map((client) => ({
    label: `${client.legal_name} - ${client.registration_number}`,
    value: client.id,
  }))
);

const filteredClients = computed(() => {
  if (!clientSearchQuery.value.trim()) return clientOptions.value;
  const searchTerm = clientSearchQuery.value.toLowerCase().trim();
  return clientOptions.value.filter((client) => client.label.toLowerCase().includes(searchTerm));
});

const addressOptions = computed(() => {
  const options = [...clientAddresses.value];

  if (formData.value.pickup_address && !options.some((addr) => addr.value === formData.value.pickup_address)) {
    options.push({
      label: formData.value.pickup_address,
      value: formData.value.pickup_address,
    });
  }

  if (selectedClient.value) {
    options.push({
      label: '+ Agregar nueva dirección',
      value: '__ADD_NEW__',
    });
  }

  return options;
});

const updateModelValue = (updates: Partial<{ client_id?: string; pickup_address?: string }>) => {
  emit('update:modelValue', { ...formData.value, ...updates });
};

const selectClient = async (client: { label: string; value: string }) => {
  const clientData = clients.value.find((c) => c.id === client.value);

  selectedClient.value = clientData || null;
  clientSearchQuery.value = client.label;
  showClientDropdown.value = false;

  await loadClientAddresses(client.value);

  const currentAddress = formData.value.pickup_address;
  const addressExists = clientAddresses.value.some((addr) => addr.value === currentAddress);
  const finalAddress = addressExists ? currentAddress : clientAddresses.value[0]?.value || '';

  updateModelValue({ client_id: client.value, pickup_address: finalAddress });
  emit('clientChanged', clientData || null);
};

const handleClientBlur = () => {
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 150);
};

const loadClientAddresses = async (clientId: string) => {
  const clientDetail = await getClientById(clientId);
  clientAddresses.value =
    clientDetail?.addresses?.map((address: ClientAddress) => ({
      label: address.address,
      value: address.address,
    })) || [];
};

const handleAddressSelection = (addressValue: string) => {
  console.log('Address value received:', addressValue); // Agregamos este log
  if (!selectedClient.value) return;

  if (addressValue === '__ADD_NEW__') {
    showAddressForm.value = true;
    updateModelValue({ pickup_address: '' });
  } else {
    showAddressForm.value = false;
    updateModelValue({ pickup_address: addressValue });
  }
};

const saveNewAddress = async () => {
  if (!newAddress.value.trim() || !selectedClient.value) return;

  const addressData = {
    label: newAddress.value.trim(),
    value: newAddress.value.trim(),
  };

  if (!clientAddresses.value.some((addr) => addr.value === addressData.value)) {
    clientAddresses.value.push(addressData);
  }

  updateModelValue({ pickup_address: addressData.value });
  showAddressForm.value = false;
  newAddress.value = '';
};

const cancelAddAddress = () => {
  showAddressForm.value = false;
  newAddress.value = '';

  if (!formData.value.pickup_address && clientAddresses.value.length > 0) {
    updateModelValue({ pickup_address: clientAddresses.value[0].value });
  }
};

const loadClients = async () => {
  clients.value = await getAllClients();
};

const initializeClient = async (clientId: string) => {
  if (!clientId || !clients.value.length) return;

  const client = clients.value.find((c) => c.id === clientId);
  if (!client) return;

  selectedClient.value = client;
  clientSearchQuery.value = `${client.legal_name} - ${client.registration_number}`;

  await loadClientAddresses(clientId);

  const currentAddress = formData.value.pickup_address;
  if (currentAddress && !clientAddresses.value.some((addr) => addr.value === currentAddress)) {
    clientAddresses.value.push({
      label: currentAddress,
      value: currentAddress,
    });
  }

  emit('clientChanged', client);
};

watch(
  () => formData.value.client_id,
  (clientId) => {
    if (clientId && clients.value.length > 0) {
      initializeClient(clientId);
    } else {
      selectedClient.value = null;
      clientSearchQuery.value = '';
    }
  },
  { immediate: true }
);

watch(
  () => formData.value.pickup_address,
  (newValue) => {
    if (newValue === '__ADD_NEW__') {
      showAddressForm.value = true;
      updateModelValue({ pickup_address: '' });
    }
  }
);

onMounted(async () => {
  await loadClients();

  if (formData.value.client_id) {
    await initializeClient(formData.value.client_id);
  }
});

defineExpose({
  loadClients,
});
</script>