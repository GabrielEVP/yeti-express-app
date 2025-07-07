<template>
  <DeliveryClientModalForm :isOpen="isModalClientFormOpen" @close="isModalClientFormOpen = false" @addClient="handleAddClient" />
  <div class="space-y-4 mb-6 px-4 sm:px-0">
    <h3 class="text-lg sm:text-xl font-semibold dark:text-white border-b pb-2">Cliente</h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:items-end">
      <div class="lg:col-span-1">
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
                v-model="newAddress"
                type="text"
                placeholder="Dirección completa"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white h-10"
                @keyup.enter="saveNewAddress"
              />
              <div class="flex flex-col sm:flex-row">
                <button
                  type="button"
                  @click="saveNewAddress"
                  :disabled="!newAddress.trim()"
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
          <PlusButton @click="isModalClientFormOpen = true" class="w-full justify-center h-10">
            <span class="text-white ml-2 text-sm sm:text-base font-medium">
              <span>Agregar Cliente</span>
            </span>
          </PlusButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { PlusButton, SelectForm } from '@/components';
import { DeliveryClientModalForm } from '@views/deliveries/components';
import { ListClient } from '@views/clients/models';
import { getAllClients, getClientById } from '@views/clients/service';
import { ClientAddress } from '@views/clients';

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

  updateValue({ clientId: client.value, pickupAddress: '' });
  loadAddresses(client.value);
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
  if (addressValue === '__ADD_NEW__') {
    showAddressForm.value = true;
    updateValue({ pickupAddress: '' });
  } else {
    showAddressForm.value = false;
    updateValue({ pickupAddress: addressValue });
  }
}

async function saveNewAddress() {
  if (!newAddress.value.trim() || !selectedClient.value) return;

  const addressData = {
    label: newAddress.value.trim(),
    value: newAddress.value.trim(),
  };

  clientAddresses.value.push(addressData);
  updateValue({ pickupAddress: addressData.value });

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

function resetSelection() {
  selectedClient.value = null;
  clientAddresses.value = [];
  showAddressForm.value = false;
  newAddress.value = '';
  clientSearchQuery.value = '';
  updateValue({ clientId: '', pickupAddress: '' });
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

onMounted(async () => {
  await loadClients();
});

defineExpose({
  loadClients,
  resetSelection,
});
</script>