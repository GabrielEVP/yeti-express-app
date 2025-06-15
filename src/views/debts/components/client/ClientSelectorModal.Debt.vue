<template>
  <div v-if="open" class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50" @click.self="emitClose">
    <div class="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl flex flex-col">
      <header class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Seleccionar Cliente</h3>
          <X @click="emitClose" class="w-6 h-6 text-black dark:text-white cursor-pointer" />
        </div>
      </header>
      <section class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <Input v-model="clientSearch" placeholder="Buscar cliente" />
      </section>
      <footer class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div
          v-for="client in filteredClients"
          :key="client.id"
          @click="select(client)"
          class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <section class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate">
              {{ client.legalName }}
            </h4>
            <Bagde>Deudas: {{ client.debtsCount }} </Bagde>
          </section>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { X } from 'lucide-vue-next';
import { Client } from '@views/clients';
import { Input, Bagde } from '@/components/';

const props = defineProps<{
  open: boolean;
  clients: Client[];
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'select', client: Client): void;
}>();

const clientSearch = ref('');

const filteredClients = computed(() => props.clients.filter((client) => client.legalName.toLowerCase().includes(clientSearch.value.toLowerCase())));

const select = (client: Client) => {
  emit('select', client);
  emit('update:open', false);
};

const emitClose = () => {
  emit('update:open', false);
};
</script>
