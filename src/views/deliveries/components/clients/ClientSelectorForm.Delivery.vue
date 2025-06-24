<template>
  <div class="space-y-4 mb-6 px-4 sm:px-0">
    <h3 class="text-lg sm:text-xl font-semibold dark:text-white border-b pb-2">Cliente</h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-end">
      <div class="lg:col-span-1">
        <!-- Reemplazamos SelectForm con un select customizado con buscador -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Cliente</label>
          <div class="relative">
            <input
              v-model="clientSearchQuery"
              type="text"
              placeholder="Buscar cliente..."
              class="text-black lg:mb-6 dark:text-white w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 h-10"
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
      </div>
      <div class="lg:col-span-1">
        <div class="space-y-2">
          <SelectForm
            v-if="!showAddressForm"
            label="Dirección de recogida"
            name="pickupAddress"
            placeholder="Selecciona una dirección"
            :items="addressOptionsWithAdd"
            @update:modelValue="handleAddressSelection"
          />
          <div v-if="showAddressForm" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Nueva Dirección</label>
            <div class="space-y-3">
              <input
                v-model="newAddress.address"
                type="text"
                placeholder="Dirección completa"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-10"
                @keyup.enter="saveNewAddress"
              />
              <div class="flex flex-col sm:flex-row">
                <button
                  type="button"
                  @click="saveNewAddress"
                  :disabled="!canSaveAddress"
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
      </div>
      <div class="lg:col-span-1 lg:mb-6">
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 lg:opacity-0">Acción</label>
          <PlusButton @click="openModalClientForm" class="w-full justify-center h-10">
            <span class="text-white ml-2 text-sm sm:text-base font-medium">
              <span>Agregar Cliente</span>
            </span>
          </PlusButton>
        </div>
      </div>
    </div>
    <DeliveryClientModalForm :isOpen="isModalClientFormOpen" @close="closeModalClientForm" @addClient="handleAddClient" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { PlusButton, SelectForm } from '@/components';
import { DeliveryClientModalForm } from '@views/deliveries/components';
import { Client, getAllClients } from '@views/clients';

interface Props {
  modelValue?: {
    clientId?: string;
    pickupAddress?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
});

interface Emits {
  (e: 'update:modelValue', value: { clientId?: string; pickupAddress?: string }): void;

  (e: 'clientChanged', client: Client | null): void;
}

const emit = defineEmits<Emits>();

const isModalClientFormOpen = ref(false);
const showAddressForm = ref(false);
const selectedClientId = ref<string | null>(null);
const clients = ref<Client[]>([]);
const clientsAddressOptions = ref<Array<{ label: string; value: string }>>([]);

// Nuevas variables para el buscador
const clientSearchQuery = ref('');
const showClientDropdown = ref(false);

const newAddress = ref({
  address: '',
});

const clientsOptions = computed(() =>
  clients.value.map((client) => ({
    label: client.legalName,
    value: client.id,
  }))
);

// Computed para filtrar clientes basado en la búsqueda
const filteredClients = computed(() => {
  if (!clientSearchQuery.value.trim()) {
    return clientsOptions.value;
  }

  const searchTerm = clientSearchQuery.value.toLowerCase().trim();
  return clientsOptions.value.filter((client) => client.label.toLowerCase().includes(searchTerm));
});

const addressOptionsWithAdd = computed(() => {
  const options = [...clientsAddressOptions.value];
  if (selectedClientId.value) {
    options.push({
      label: '+ Agregar nueva dirección',
      value: '__ADD_NEW__',
    });
  }
  return options;
});

const canSaveAddress = computed(() => {
  return newAddress.value.address.trim() !== '';
});

// Función para seleccionar un cliente desde el dropdown
function selectClient(client: { label: string; value: string }) {
  clientSearchQuery.value = client.label;
  showClientDropdown.value = false;
  handleClientSelection(client.value);
}

// Función para manejar el blur del input de búsqueda
function handleClientBlur() {
  // Usamos setTimeout para permitir que el click en el dropdown se procese antes
  setTimeout(() => {
    showClientDropdown.value = false;
  }, 150);
}

// Watch para mantener sincronizado el input de búsqueda con la selección actual
watch(selectedClientId, (newClientId) => {
  if (newClientId) {
    const client = clients.value.find((c) => c.id === newClientId);
    if (client) {
      clientSearchQuery.value = client.legalName;
    }
  } else {
    clientSearchQuery.value = '';
  }
});

// Watch para inicializar el input cuando se carga un valor existente (modo edit)
watch(
  () => props.modelValue?.clientId,
  (clientId) => {
    if (clientId && clients.value.length > 0) {
      const client = clients.value.find((c) => c.id === clientId);
      if (client && clientSearchQuery.value !== client.legalName) {
        clientSearchQuery.value = client.legalName;
      }
    } else if (!clientId) {
      clientSearchQuery.value = '';
    }
  },
  { immediate: true }
);

watch(
  () => props.modelValue?.clientId,
  async (newClientId, oldClientId) => {
    if (newClientId && newClientId !== oldClientId && newClientId !== selectedClientId.value) {
      selectedClientId.value = newClientId;
      await loadAddresses(newClientId);

      const client = clients.value.find((c) => c.id === newClientId);
      emit('clientChanged', client || null);
    }
  },
  { immediate: true }
);

function updateValue(updates: Partial<{ clientId?: string; pickupAddress?: string }>) {
  const newValue = { ...props.modelValue, ...updates };
  emit('update:modelValue', newValue);
}

function handleClientSelection(clientId: string) {
  selectedClientId.value = clientId;
  updateValue({ clientId, pickupAddress: '' });
  loadAddresses(clientId);

  const client = clients.value.find((c) => c.id === clientId);
  emit('clientChanged', client || null);
}

async function loadAddresses(clientId: string) {
  const client = clients.value.find((c) => c.id === clientId);
  if (client) {
    const addresses = client.addresses || [];
    clientsAddressOptions.value = addresses.map((address) => ({
      label: address.address,
      value: address.address,
    }));
  } else {
    clientsAddressOptions.value = [];
  }

  showAddressForm.value = false;
  resetNewAddress();
}

function handleAddressSelection(addressValue: string) {
  if (addressValue === '__ADD_NEW__') {
    showAddressForm.value = true;
    updateValue({ pickupAddress: '' });
  } else {
    showAddressForm.value = false;
    updateValue({ pickupAddress: addressValue });
  }
}

function resetNewAddress() {
  newAddress.value = {
    address: '',
  };
}

async function saveNewAddress() {
  if (!canSaveAddress.value || !selectedClientId.value) return;

  const newAddressData = {
    clientId: selectedClientId.value,
    address: newAddress.value.address.trim(),
  };

  const newAddressOption = {
    label: newAddressData.address,
    value: newAddressData.address,
  };

  clientsAddressOptions.value.push(newAddressOption);

  updateValue({ pickupAddress: newAddressData.address });

  showAddressForm.value = false;
  resetNewAddress();

  clients.value = await getAllClients();
}

function cancelAddAddress() {
  showAddressForm.value = false;
  resetNewAddress();
}

function openModalClientForm() {
  isModalClientFormOpen.value = true;
}

function closeModalClientForm() {
  isModalClientFormOpen.value = false;
}

async function handleAddClient(newClient: Client) {
  try {
    const firstAddress = newClient.addresses?.[0]?.address || '';

    clients.value = await getAllClients();
    selectedClientId.value = newClient.id;

    await loadAddresses(newClient.id);
    await nextTick();

    updateValue({
      clientId: newClient.id,
      pickupAddress: firstAddress,
    });

    emit('clientChanged', newClient);

    closeModalClientForm();
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

async function initializeWithExistingData() {
  if (props.modelValue?.clientId) {
    selectedClientId.value = props.modelValue.clientId;

    // Establecer el texto de búsqueda con el cliente seleccionado
    const client = clients.value.find((c) => c.id === props.modelValue?.clientId);
    if (client) {
      clientSearchQuery.value = client.legalName;
      emit('clientChanged', client);
    }

    await loadAddresses(props.modelValue.clientId);
  }
}

onMounted(async () => {
  await loadClients();
  await initializeWithExistingData();
});

defineExpose({
  loadClients,
  resetSelection: () => {
    selectedClientId.value = null;
    clientsAddressOptions.value = [];
    showAddressForm.value = false;
    resetNewAddress();
    clientSearchQuery.value = '';
    updateValue({ clientId: '', pickupAddress: '' });
  },
});
</script>
