<template>
  <SideBar>
    <div class="min-h-screen transition-colors duration-300">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <!-- Header -->
        <div class="mb-6 sm:mb-8">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 class="text-xl sm:text-2xl font-light text-gray-900 dark:text-gray-100 mb-2">
                Gestión de Pagos
              </h1>
              <div class="h-px bg-gray-200 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>

        <!-- Client Selection Tab -->
        <div
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 rounded-lg shadow-sm"
        >
          <div class="p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div class="min-w-0 flex-1">
                  <h2
                    class="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 truncate"
                  >
                    {{ selectedClient.name }}
                  </h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                    {{ selectedClient.email }}
                  </p>
                </div>
                <div class="hidden sm:block h-8 w-px bg-gray-200 dark:bg-gray-700"></div>
                <div class="text-sm text-gray-500 dark:text-gray-400 sm:whitespace-nowrap">
                  Cliente activo
                </div>
              </div>

              <button
                @click="openClientModal"
                class="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                Cambiar Cliente
              </button>
            </div>

            <div
              class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700"
            >
              <div class="text-center">
                <div class="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
                  Entregas
                </div>
                <div class="text-lg sm:text-xl font-light text-gray-900 dark:text-gray-100">
                  {{ deliveries.length }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
                  Total
                </div>
                <div class="text-lg sm:text-xl font-light text-gray-900 dark:text-gray-100">
                  {{ formatCurrency(totalAmount) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
                  Pagado
                </div>
                <div class="text-lg sm:text-xl font-light text-emerald-600 dark:text-emerald-400">
                  {{ formatCurrency(paidAmount) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-xs uppercase tracking-wide text-gray-400 dark:text-gray-500 mb-1">
                  Pendiente
                </div>
                <div class="text-lg sm:text-xl font-light text-amber-600 dark:text-amber-400">
                  {{ formatCurrency(totalAmount - paidAmount) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 rounded-lg shadow-sm"
        >
          <div class="p-4 sm:p-6">
            <div class="flex flex-col gap-4">
              <!-- Status Filter - Horizontal scroll on mobile -->
              <div class="overflow-x-auto">
                <div class="flex gap-1 min-w-max sm:min-w-0">
                  <button
                    v-for="status in statusOptions"
                    :key="status.value"
                    @click="selectedStatus = status.value"
                    class="px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap"
                    :class="
                      selectedStatus === status.value
                        ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    "
                  >
                    {{ status.label }}
                  </button>
                </div>
              </div>

              <!-- Search Input -->
              <div class="w-full sm:max-w-sm">
                <input
                  v-model="searchTerm"
                  placeholder="Buscar por ID de entrega..."
                  class="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Deliveries List -->
        <div class="space-y-2 sm:space-y-3 mb-6">
          <div
            v-for="delivery in paginatedDeliveries"
            :key="delivery.id"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
          >
            <div class="p-4 sm:p-6">
              <!-- Mobile Layout -->
              <div class="sm:hidden space-y-4">
                <div class="flex items-start justify-between">
                  <div class="flex flex-col gap-2">
                    <span
                      class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded self-start"
                      >{{ delivery.id }}</span
                    >
                    <span
                      class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full self-start"
                      :class="getStatusClass(delivery.status)"
                    >
                      {{ getStatusText(delivery.status) }}
                    </span>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-light text-gray-900 dark:text-gray-100">
                      {{ formatCurrency(delivery.amount) }}
                    </div>
                    <div
                      v-if="delivery.paidAmount > 0"
                      class="text-sm text-gray-500 dark:text-gray-400"
                    >
                      Resta: {{ formatCurrency(delivery.amount - delivery.paidAmount) }}
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(delivery.date) }}
                  </div>
                </div>

                <div v-if="delivery.status !== 'paid'" class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openPaymentModal(delivery, 'full')"
                    class="w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm"
                  >
                    Pagar Todo
                  </button>
                  <button
                    @click="openPaymentModal(delivery, 'partial')"
                    class="w-full px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                  >
                    Pago Parcial
                  </button>
                </div>
              </div>

              <!-- Desktop Layout -->
              <div class="hidden sm:flex items-center justify-between">
                <div class="flex items-center gap-6">
                  <div class="flex items-center gap-3">
                    <span
                      class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded"
                      >{{ delivery.id }}</span
                    >
                    <span
                      class="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusClass(delivery.status)"
                    >
                      {{ getStatusText(delivery.status) }}
                    </span>
                  </div>

                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDate(delivery.date) }}
                  </div>
                </div>

                <div class="flex items-center gap-8">
                  <div class="text-right">
                    <div class="text-lg font-light text-gray-900 dark:text-gray-100">
                      {{ formatCurrency(delivery.amount) }}
                    </div>
                    <div
                      v-if="delivery.paidAmount > 0"
                      class="text-sm text-gray-500 dark:text-gray-400"
                    >
                      Resta: {{ formatCurrency(delivery.amount - delivery.paidAmount) }}
                    </div>
                  </div>

                  <div v-if="delivery.status !== 'paid'" class="flex gap-2">
                    <button
                      @click="openPaymentModal(delivery, 'full')"
                      class="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 shadow-sm"
                    >
                      Pagar Todo
                    </button>
                    <button
                      @click="openPaymentModal(delivery, 'partial')"
                      class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      Pago Parcial
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div
            v-if="filteredDeliveries.length === 0"
            class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm p-8"
          >
            <div class="text-center">
              <div class="text-gray-400 dark:text-gray-500 mb-2">
                <svg
                  class="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
              </div>
              <p class="text-gray-500 dark:text-gray-400">No se encontraron entregas</p>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
        >
          <div class="px-4 sm:px-6 py-4">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div class="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
                Página {{ currentPage }} de {{ totalPages }} •
                {{ filteredDeliveries.length }} entregas
              </div>
              <div class="flex items-center justify-center sm:justify-end gap-2">
                <button
                  @click="currentPage--"
                  :disabled="currentPage === 1"
                  class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Anterior
                </button>
                <button
                  @click="currentPage++"
                  :disabled="currentPage === totalPages"
                  class="px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Client Selection Modal -->
      <div
        v-if="showClientModal"
        class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
        @click.self="closeClientModal"
      >
        <div
          class="bg-white dark:bg-gray-800 w-full max-w-2xl max-h-[90vh] rounded-lg shadow-xl flex flex-col"
        >
          <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                Seleccionar Cliente
              </h3>
              <button
                @click="closeClientModal"
                class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <input
              v-model="clientSearchTerm"
              placeholder="Buscar cliente..."
              class="w-full px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div class="flex-1 overflow-y-auto p-4 sm:p-6">
            <div class="space-y-2">
              <div
                v-for="client in filteredClients"
                :key="client.id"
                @click="selectClient(client)"
                class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                :class="
                  selectedClient.id === client.id
                    ? 'ring-2 ring-gray-900 dark:ring-gray-400 bg-gray-50 dark:bg-gray-700'
                    : ''
                "
              >
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <h4 class="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {{ client.name }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {{ client.email }}
                    </p>
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400 self-start sm:self-center">
                    {{ client.deliveryCount }} entregas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] rounded-lg shadow-xl flex flex-col"
        >
          <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              {{ paymentType === 'full' ? 'Pago Completo' : 'Pago Parcial' }}
            </h3>
          </div>

          <div class="flex-1 overflow-y-auto p-4 sm:p-6">
            <div class="space-y-4 mb-6">
              <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">ID de Entrega</div>
                <div class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
                  {{ selectedDelivery?.id }}
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="text-gray-500 dark:text-gray-400 mb-1">Monto Total</div>
                  <div class="font-medium text-gray-900 dark:text-gray-100">
                    {{ formatCurrency(selectedDelivery?.amount || 0) }}
                  </div>
                </div>
                <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div class="text-gray-500 dark:text-gray-400 mb-1">Pendiente</div>
                  <div class="font-medium text-amber-600 dark:text-amber-400">
                    {{
                      formatCurrency(
                        (selectedDelivery?.amount || 0) - (selectedDelivery?.paidAmount || 0)
                      )
                    }}
                  </div>
                </div>
              </div>

              <div
                v-if="paymentType === 'full'"
                class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
              >
                <div class="text-sm text-emerald-700 dark:text-emerald-400 mb-1">
                  Cantidad a Pagar
                </div>
                <div class="text-lg font-medium text-emerald-900 dark:text-emerald-300">
                  {{
                    formatCurrency(
                      (selectedDelivery?.amount || 0) - (selectedDelivery?.paidAmount || 0)
                    )
                  }}
                </div>
              </div>
            </div>

            <div v-if="paymentType === 'partial'" class="mb-6">
              <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2"
                >Cantidad a Pagar</label
              >
              <input
                v-model="partialAmount"
                type="number"
                step="0.01"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-400 focus:border-transparent"
                :max="(selectedDelivery?.amount || 0) - (selectedDelivery?.paidAmount || 0)"
              />
            </div>

            <div class="mb-8">
              <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3"
                >Método de Pago</label
              >
              <div class="space-y-3">
                <label
                  class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <input
                    type="radio"
                    value="card"
                    v-model="paymentMethod"
                    class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                  <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >💳 Tarjeta</span
                  >
                </label>
                <label
                  class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <input
                    type="radio"
                    value="transfer"
                    v-model="paymentMethod"
                    class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                  <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >🏦 Transferencia</span
                  >
                </label>
                <label
                  class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <input
                    type="radio"
                    value="cash"
                    v-model="paymentMethod"
                    class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                  />
                  <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                    >💵 Efectivo</span
                  >
                </label>
              </div>
            </div>
          </div>

          <div class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                @click="processPayment"
                :disabled="!paymentMethod"
                class="flex-1 py-2 px-4 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                Confirmar Pago
              </button>
              <button
                @click="closeModal"
                class="flex-1 py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { SideBar } from '@components';
import { ref, computed, onMounted } from 'vue';

interface Delivery {
  id: string;
  date: string;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'paid' | 'partial';
}

interface Client {
  id: string;
  name: string;
  email: string;
  deliveryCount: number;
}

// Reactive state
const searchTerm = ref('');
const selectedStatus = ref('all');
const currentPage = ref(1);
const itemsPerPage = 10;
const showModal = ref(false);
const showClientModal = ref(false);
const selectedDelivery = ref<Delivery | null>(null);
const partialAmount = ref('');
const paymentType = ref<'full' | 'partial'>('full');
const paymentMethod = ref('');
const deliveries = ref<Delivery[]>([]);
const isDarkMode = ref(false);
const clientSearchTerm = ref('');

// Static data
const clients: Client[] = [
  {
    id: '1',
    name: 'Restaurante El Buen Sabor',
    email: 'contacto@elbuensabor.com',
    deliveryCount: 45,
  },
  { id: '2', name: 'Pizzería Roma', email: 'info@pizzeriaroma.es', deliveryCount: 32 },
  { id: '3', name: 'Café Central', email: 'admin@cafecentral.com', deliveryCount: 28 },
  { id: '4', name: 'Marisquería Atlántico', email: 'pedidos@atlantico.es', deliveryCount: 19 },
  { id: '5', name: 'Sushi Zen', email: 'orders@sushizen.com', deliveryCount: 15 },
  { id: '6', name: 'La Parrilla Argentina', email: 'contacto@laparrilla.es', deliveryCount: 23 },
  { id: '7', name: 'Burger House', email: 'info@burgerhouse.com', deliveryCount: 38 },
  { id: '8', name: 'Taco Libre', email: 'pedidos@tacolibre.es', deliveryCount: 12 },
];

const selectedClient = ref<Client>(clients[0]);

const statusOptions = [
  { label: 'Todos', value: 'all' },
  { label: 'Pendientes', value: 'pending' },
  { label: 'Parciales', value: 'partial' },
  { label: 'Pagados', value: 'paid' },
];

// Generate sample data
const generateDeliveries = (): Delivery[] => {
  const data: Delivery[] = [];
  const statuses: ('pending' | 'paid' | 'partial')[] = ['pending', 'paid', 'partial'];

  for (let i = 1; i <= 100; i++) {
    const amount = Math.round((Math.random() * 200 + 50) * 100) / 100;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    let paidAmount = 0;

    if (status === 'paid') {
      paidAmount = amount;
    } else if (status === 'partial') {
      paidAmount = Math.round((amount * 0.3 + Math.random() * amount * 0.4) * 100) / 100;
    }

    data.push({
      id: `DEL-${String(i).padStart(3, '0')}`,
      date: new Date(2025, 0, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
      amount,
      paidAmount,
      status,
    });
  }

  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Computed properties
const filteredDeliveries = computed(() => {
  const filtered = deliveries.value.filter((delivery) => {
    const matchesStatus =
      selectedStatus.value === 'all' || delivery.status === selectedStatus.value;
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (currentPage.value > Math.ceil(filtered.length / itemsPerPage)) {
    currentPage.value = 1;
  }

  return filtered;
});

const filteredClients = computed(() => {
  return clients.filter(
    (client) =>
      client.name.toLowerCase().includes(clientSearchTerm.value.toLowerCase()) ||
      client.email.toLowerCase().includes(clientSearchTerm.value.toLowerCase())
  );
});

const totalPages = computed(() => {
  return Math.ceil(filteredDeliveries.value.length / itemsPerPage);
});

const paginatedDeliveries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredDeliveries.value.slice(start, end);
});

const totalAmount = computed(() => {
  return deliveries.value.reduce((sum, d) => sum + d.amount, 0);
});

const paidAmount = computed(() => {
  return deliveries.value.reduce((sum, d) => sum + d.paidAmount, 0);
});

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES');
};

const getStatusClass = (status: string): string => {
  const classes = {
    paid: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800',
    partial:
      'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800',
    pending:
      'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800',
  };
  return classes[status as keyof typeof classes] || '';
};

const getStatusText = (status: string): string => {
  const texts = {
    paid: 'Pagado',
    partial: 'Parcial',
    pending: 'Pendiente',
  };
  return texts[status as keyof typeof texts] || status;
};

// Dark mode functions
const toggleDarkMode = (): void => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Client modal functions
const openClientModal = (): void => {
  showClientModal.value = true;
  clientSearchTerm.value = '';
};

const closeClientModal = (): void => {
  showClientModal.value = false;
};

const selectClient = (client: Client): void => {
  selectedClient.value = client;
  closeClientModal();
  // In a real app, you would fetch deliveries for this client
  deliveries.value = generateDeliveries();
};

// Modal functions
const openPaymentModal = (delivery: Delivery, type: 'full' | 'partial'): void => {
  selectedDelivery.value = delivery;
  paymentType.value = type;
  partialAmount.value = '';
  paymentMethod.value = '';
  showModal.value = true;
};

const closeModal = (): void => {
  showModal.value = false;
  selectedDelivery.value = null;
  paymentMethod.value = '';
};

const processPayment = (): void => {
  if (!selectedDelivery.value || !paymentMethod.value) return;

  const delivery = selectedDelivery.value;
  let paymentAmount = 0;

  if (paymentType.value === 'full') {
    paymentAmount = delivery.amount - delivery.paidAmount;
  } else {
    paymentAmount = parseFloat(partialAmount.value);
    const remaining = delivery.amount - delivery.paidAmount;

    if (paymentAmount <= 0 || paymentAmount > remaining) {
      alert('Cantidad inválida');
      return;
    }
  }

  // Process payment
  delivery.paidAmount += paymentAmount;

  if (delivery.paidAmount >= delivery.amount) {
    delivery.status = 'paid';
  } else {
    delivery.status = 'partial';
  }

  console.log(`Pago procesado: ${paymentAmount}€ via ${paymentMethod.value}`);
  closeModal();
};

// Initialize data
onMounted(() => {
  deliveries.value = generateDeliveries();
});
</script>
