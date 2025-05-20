<template>
   <SelectorClient ref="selectorRef" :client="clientSearch" :address="addressSearch" @openModal="openModalClientForm" @update:client="clientSearch = $event" @update:address="addressSearch = $event">
      <template #list>
         <ul class="max-h-60 overflow-auto py-1">
            <template v-if="filteredClients.length">
               <li
                  v-for="(client, index) in filteredClients"
                  :key="index"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                  @click="selectClient(client)"
               >
                  {{ client.legalName }}
               </li>
            </template>
            <template v-else>
               <li class="px-4 py-2 text-gray-500 dark:text-gray-400 italic">No hay clientes para mostrar</li>
            </template>
         </ul>
      </template>
      <template #direccion>
         <ul class="max-h-60 overflow-auto py-1">
            <template v-if="filteredAddresses.length">
               <li
                  v-for="(address, index) in filteredAddresses"
                  :key="index"
                  class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
                  @click="selectAddress(address)"
               >
                  {{ address.address }}
               </li>
            </template>
            <template v-else>
               <li class="px-4 py-2 text-gray-500 dark:text-gray-400 italic">No hay direcciones para mostrar</li>
            </template>
         </ul>
      </template>
      <template #modal>
         <FormClientModal :isOpen="isModalClientFormOpen" @close="closeModalClientForm" @addClient="addNewClient" />
      </template>
   </SelectorClient>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineProps } from "vue";
import { Client, getClients, ClientAddress } from "@views/clients";
import { FormClientModal, SelectorClient } from "@/views/deliveries/";

const props = defineProps<{
   clientId: string;
   addressId: string;
}>();

const emit = defineEmits<{
   (event: "update:clientId", value: string): void;
   (event: "update:addressId", value: string): void;
}>();

const selectorRef = ref<InstanceType<typeof SelectorClient>>();
const clients = ref<Client[]>([]);
const selectedClient = ref<Client | null>(null);

const clientSearch = ref("");
const addressSearch = ref("");
const isModalClientFormOpen = ref(false);

onMounted(async () => {
   clients.value = await getClients();
   syncFromProps();
});

const openModalClientForm = () => {
   isModalClientFormOpen.value = true;
};

const closeModalClientForm = () => {
   isModalClientFormOpen.value = false;
};

const filteredClients = computed(() => clients.value.filter((c) => c.legalName.toLowerCase().includes(clientSearch.value.toLowerCase())));
const filteredAddresses = computed(() => selectedClient.value?.addresses.filter((a) => a.address.toLowerCase().includes(addressSearch.value.toLowerCase())) ?? []);

function selectClient(client: Client) {
   clientSearch.value = client.legalName;
   selectedClient.value = client;
   addressSearch.value = "";
   emit("update:clientId", String(client.id));
   selectorRef.value?.closeDropdowns();
}

function selectAddress(address: ClientAddress) {
   addressSearch.value = address.address;
   emit("update:addressId", String(address.id));
   selectorRef.value?.closeDropdowns();
}

function syncFromProps() {
   const client = clients.value.find((c) => String(c.id) === props.clientId);
   if (client) {
      clientSearch.value = client.legalName;
      selectedClient.value = client;
   }

   const address = selectedClient.value?.addresses.find((a) => String(a.id) === props.addressId);
   if (address) {
      addressSearch.value = address.address;
   }
}

function addNewClient(client: Client) {
   clients.value.push(client);
   selectClient(client);
   isModalClientFormOpen.value = false;
}

watch(() => props.clientId, syncFromProps);
watch(() => props.addressId, syncFromProps);
</script>
