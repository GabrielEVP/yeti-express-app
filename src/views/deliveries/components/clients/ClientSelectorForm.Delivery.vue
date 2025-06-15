<template>
  <div class="space-y-4 mb-6 px-4 sm:px-0">
    <h3 class="text-lg sm:text-xl font-semibold dark:text-white border-b pb-2">Cliente</h3>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <div class="lg:col-span-1">
        <SelectForm
          label="Cliente"
          name="clientId"
          placeholder="Selecciona un Cliente"
          :items="clientsOptions"
          @update:modelValue="handleClientSelection"
        />
      </div>
      <div class="lg:col-span-1">
        <div class="space-y-2">
          <SelectForm
            v-if="!showAddressForm"
            label="Dirección de recogida"
            name="clientAddressId"
            placeholder="Selecciona una dirección"
            :items="addressOptionsWithAdd"
            @update:modelValue="handleAddressSelection"
          />

          <!-- Formulario para nueva dirección -->
          <div v-if="showAddressForm" class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300"> Nueva Dirección </label>
            <div class="space-y-3">
              <input
                v-model="newAddress.address"
                type="text"
                placeholder="Dirección completa"
                class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                @keyup.enter="saveNewAddress"
              />

              <!-- Botones del formulario de dirección -->
              <div class="flex flex-col sm:flex-row gap-2">
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
      <div class="lg:col-span-1 flex items-center">
        <PlusButton @click="openModalClientForm" class="w-full sm:w-auto sm:min-w-[200px] lg:w-full justify-center">
          <span class="text-white ml-2 text-sm sm:text-base font-medium">
            <span>Agregar Cliente</span>
          </span>
        </PlusButton>
      </div>
    </div>
    <DeliveryClientModalForm :isOpen="isModalClientFormOpen" @close="closeModalClientForm" @addClient="handleAddClient" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { SelectForm, PlusButton } from '@/components';
import { DeliveryClientModalForm } from '@views/deliveries/components';
import { Client } from '@views/clients';
import { getAllClients, createClientAddress } from '@views/clients';

interface Props {
  modelValue?: {
    clientId?: string;
    clientAddressId?: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({}),
});

interface Emits {
  (e: 'update:modelValue', value: { clientId?: string; clientAddressId?: string }): void;
  (e: 'clientChanged', client: Client | null): void;
}

const emit = defineEmits<Emits>();

const isModalClientFormOpen = ref(false);
const showAddressForm = ref(false);
const selectedClientId = ref<string | null>(null);
const clients = ref<Client[]>([]);
const clientsAddressOptions = ref<Array<{ label: string; value: string }>>([]);

const newAddress = ref({
  address: '',
});

const clientsOptions = computed(() =>
  clients.value.map((client) => ({
    label: client.legalName,
    value: client.id,
  }))
);

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

function updateValue(updates: Partial<{ clientId?: string; clientAddressId?: string }>) {
  const newValue = { ...props.modelValue, ...updates };
  emit('update:modelValue', newValue);
}

function handleClientSelection(clientId: string) {
  selectedClientId.value = clientId;
  updateValue({ clientId, clientAddressId: '' });
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
      value: address.id,
    }));
  } else {
    clientsAddressOptions.value = [];
  }

  showAddressForm.value = false;
  resetNewAddress();
}

function handleAddressSelection(addressId: string) {
  if (addressId === '__ADD_NEW__') {
    showAddressForm.value = true;
    updateValue({ clientAddressId: '' });
  } else {
    showAddressForm.value = false;
    updateValue({ clientAddressId: addressId });
  }
}

function resetNewAddress() {
  newAddress.value = {
    address: '',
  };
}

async function saveNewAddress() {
  if (!canSaveAddress.value || !selectedClientId.value) return;

  try {
    const newAddressData = {
      clientId: selectedClientId.value,
      address: newAddress.value.address.trim(),
    };

    const createdAddress = await createClientAddress(newAddressData);

    const newAddressOption = {
      label: createdAddress.address,
      value: createdAddress.id,
    };

    clientsAddressOptions.value.push(newAddressOption);

    updateValue({ clientAddressId: createdAddress.id });

    showAddressForm.value = false;
    resetNewAddress();

    clients.value = await getAllClients();
  } catch (error) {
    console.error('Error al guardar la dirección:', error);
  }
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
    const firstAddressId = newClient.addresses?.[0]?.id || '';

    clients.value = await getAllClients();
    selectedClientId.value = newClient.id;

    await loadAddresses(newClient.id);
    await nextTick();

    updateValue({
      clientId: newClient.id,
      clientAddressId: firstAddressId,
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
    await loadAddresses(props.modelValue.clientId);
    const client = clients.value.find((c) => c.id === props.modelValue?.clientId);
    if (client) {
      emit('clientChanged', client);
    }
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
    updateValue({ clientId: '', clientAddressId: '' });
  },
});
</script>
