<template>
   <Selector ref="selectorRef" v-model="search" label="Cliente" @openModal="openModalClientForm">
      <template #list>
         <ul class="max-h-60 overflow-auto py-1">
            <li
               v-for="(client, index) in filteredClients"
               :key="index"
               class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
               @click="selectClient(client)"
            >
               {{ client.legalName }}
            </li>
         </ul>
      </template>
      <template #modal>
         <FormBasicClientModal :isOpen="isModalClientFormOpen" @close="closeModalClientForm" @addClient="addNewClient" />
      </template>
   </Selector>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps, watch, nextTick } from "vue";
import { Client, getClients } from "@views/clients";
import Selector from "@components/forms/Selector.vue";
import { FormBasicClientModal } from "@/views/deliveries/";
const props = defineProps<{
   clientId: string;
   clientIdAttrs?: any;
}>();

const selectorRef = ref<InstanceType<typeof Selector>>();

const emit = defineEmits<{
   (event: "update:clientId", value: string): void;
}>();

const search = ref<string>("");
const clients = ref<Client[]>([]);
const loaded = ref(false);

onMounted(async () => {
   const data = await getClients();
   clients.value = Array.isArray(data) ? data : data ? [data] : [];
   loaded.value = true;

   if (props.clientId) {
      await updateClientDisplay();
   }
});

const updateClientDisplay = async () => {
   if (!props.clientId || !loaded.value || clients.value.length === 0) return;

   const clientIdStr = String(props.clientId);
   const selectedClient = clients.value.find((client) => String(client.id) === clientIdStr);

   if (selectedClient) {
      search.value = selectedClient.legalName;
   }
};

watch(
   () => props.clientId,
   async (newClientId) => {
      if (newClientId && loaded.value) {
         await updateClientDisplay();
      }
   },
   { immediate: true }
);

watch(
   () => clients.value,
   async () => {
      if (props.clientId && loaded.value) {
         await nextTick();
         await updateClientDisplay();
      }
   }
);

const isModalClientFormOpen = ref(false);

const filteredClients = computed(() => {
   return clients.value.filter((client) => client.legalName.toLowerCase().includes((search.value || "").toLowerCase()));
});

const selectClient = (client: any) => {
   search.value = client.legalName ?? "";
   selectorRef.value?.closeDropdown();
   emit("update:clientId", String(client.id));
};

const openModalClientForm = () => {
   isModalClientFormOpen.value = true;
};

const closeModalClientForm = () => {
   isModalClientFormOpen.value = false;
};

const addNewClient = async (clientData: any) => {
   clients.value.push(clientData);
   selectClient(clientData);
   emit("update:clientId", String(clientData.id));
   closeModalClientForm();
};
</script>
