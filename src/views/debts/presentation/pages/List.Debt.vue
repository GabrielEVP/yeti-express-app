<template>
  <SideBar>
    <ClientSelectorModal
      v-model:open="isOpen"
      :clients="clients"
      @select="selectedClient = $event"
    />
    <ClientSelect :selectedClient="selectedClient as Client" @open="open" />
    <DeliveryList :clientId="selectedClient?.getId() ?? null" />
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { SideBar } from '@components';
import { useModal } from '@composables';
import { Client } from '@/views/clients/domain/';
import { GetClientsUseCase } from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';

import ClientSelectorModal from '../components/client/ClientSelectorModal.Debt.vue';
import DeliveryList from '../components/deliveries/DeliveryList.vue';
import ClientSelect from '../components/client/ClientSelect.Debt.vue';

const repository = new ClientRepositoryImpl();
const getClientsUseCase = new GetClientsUseCase(repository);

const clients = ref<Client[]>([]);
const selectedClient = ref<Client | null>(null);

onMounted(async () => {
  clients.value = await getClientsUseCase.execute();
});

const { isOpen, open } = useModal();
</script>
