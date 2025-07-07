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
          v-if="filteredClients && filteredClients.length > 0"
          v-for="client in filteredClients"
          :key="client.id"
          @click="select(client)"
          class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 mb-3"
        >
          <div class="flex flex-col space-y-2">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 text-lg truncate">
                {{ client.legal_name }}
              </h4>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ client.registration_number }}</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-2 gap-2 mt-2">
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-center">
                <span class="text-xs text-gray-500 dark:text-gray-400">Deudas Pendientes</span>
                <span class="text-base font-semibold text-gray-700 dark:text-gray-300">{{ client.debt_counts || 0 }}</span>
              </div>
              <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-2 flex flex-col items-center justify-center">
                <span class="text-xs text-gray-500 dark:text-gray-400">Monto Pendiente</span>
                <span class="text-base font-semibold text-gray-700 dark:text-gray-300">{{ formatToDollars(client.total_pending || 0) }}</span>
              </div>
            </div>
          </div>
        </div>
        <empty-data v-else-if="filteredClients && filteredClients.length === 0" message="No se encontraron clientes con el criterio de búsqueda" />
        <empty-data v-else />
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { X } from 'lucide-vue-next';
import { ClientDebt } from '@views/debts/models';
import { Input } from '@/components/';
import { EmptyData } from '@components';
import { formatToDollars } from '@utils';

const props = defineProps<{
  open: boolean;
  clients: ClientDebt[];
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
  (e: 'select', client: ClientDebt): void;
}>();

const clientSearch = ref('');

const filteredClients = computed(() => props.clients.filter((client) => client.legal_name.toLowerCase().includes(clientSearch.value.toLowerCase())));

const select = (client: ClientDebt) => {
  emit('select', client);
  emit('update:open', false);
};

const emitClose = () => {
  emit('update:open', false);
};
</script>
