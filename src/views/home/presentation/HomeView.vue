<template>
  <Sidebar>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <ActivityView title="Ordenes realizadas">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            {{ stats?.deliveries?.total || 0 }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Total de entregas</p>
        </template>
      </ActivityView>
      <ActivityView title="Total Facturado">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            ${{ formatNumber(stats?.total_invoiced || 0) }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Ingresos totales</p>
        </template>
      </ActivityView>
      <ActivityView title="Cobros">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            ${{ formatNumber(stats?.debt_payments || 0) }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Pagos recibidos</p>
        </template>
      </ActivityView>
      <ActivityView title="Gastos">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            ${{ formatNumber(stats?.company_bills || 0) }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Gastos totales</p>
        </template>
      </ActivityView>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card class="p-8">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Ordenes realizadas</h2>
          <select
            v-model="rangePedidos"
            class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>
        <div class="relative h-[300px] w-full">
          <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
          <Bar v-else :data="chartPedidosData" :options="chartOptions()" />
        </div>
      </Card>
      <Card class="p-8">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Total Facturado</h2>
          <select
            v-model="rangeMontos"
            class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="day">Día</option>
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>
        <div class="relative h-[300px] w-full">
          <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
          <Bar v-else :data="chartMontosData" :options="chartOptions()" />
        </div>
      </Card>
    </div>
    <Card class="p-8 mt-4">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Balance en caja</h2>
        <select
          v-model="rangeFinanzas"
          class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          <option value="day">Día</option>
          <option value="week">Semana</option>
          <option value="month">Mes</option>
          <option value="year">Año</option>
        </select>
      </div>
      <div class="relative min-h-[300px]">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <Bar v-else :data="chartFinanzasData" :options="chartOptions()" />
      </div>
    </Card>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/layouts/BarLayourt.vue';
import { Card, ActivityView } from '@/components/';
import { ref, computed, onMounted, watch } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'vue-chartjs';
import { GetDashboardStatsUseCase } from '@views/home/application/GetDashboardStatsUseCase';
import { DashboardApi } from '@views/home/infrastructure/Dashboard.Api';
import type { DashboardStats } from '@views/home/domain/DashboardStats';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const rangePedidos = ref<'day' | 'week' | 'month' | 'year'>('week');
const rangeMontos = ref<'day' | 'week' | 'month' | 'year'>('week');
const rangeFinanzas = ref<'day' | 'week' | 'month' | 'year'>('week');
const stats = ref<DashboardStats | null>(null);
const isLoading = ref(false);

const getDashboardStatsUseCase = new GetDashboardStatsUseCase(DashboardApi);

const formatNumber = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const fetchStats = async (period: string, date: string) => {
  isLoading.value = true;
  try {
    const response = await getDashboardStatsUseCase.execute({ period, date });
    console.log('API Response:', response);

    if (!response?.historical_data?.deliveries) {
      console.warn('API response missing historical_data.deliveries');
      stats.value = {
        ...response,
        historical_data: {
          deliveries: [
            {
              date: 'Hoy',
              count: 0,
              total: 0,
            },
          ],
        },
      };
    } else {
      stats.value = response;
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    stats.value = null;
  } finally {
    isLoading.value = false;
  }
};

watch([rangePedidos, rangeMontos, rangeFinanzas], () => {
  const today = new Date().toISOString().split('T')[0];
  fetchStats(rangePedidos.value, today);
});

onMounted(() => {
  const today = new Date().toISOString().split('T')[0];
  fetchStats('week', today);
});

const chartPedidosData = computed(() => {
  const defaultData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Ordenes realizadas',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };

  if (!stats.value?.historical_data?.deliveries) {
    return defaultData;
  }

  const deliveries = stats.value.historical_data.deliveries;
  const labels = deliveries.map((d) => d.date);
  const data = deliveries.map((d) => d.count);

  return {
    labels,
    datasets: [
      {
        label: 'Ordenes realizadas',
        data,
        backgroundColor: '#6366f1',
        borderRadius: 6,
      },
    ],
  };
});

const chartMontosData = computed(() => {
  const defaultData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Total Facturado',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };

  if (!stats.value?.historical_data?.deliveries) {
    return defaultData;
  }

  const deliveries = stats.value.historical_data.deliveries;
  const labels = deliveries.map((d) => d.date);
  const data = deliveries.map((d) => d.total);

  return {
    labels,
    datasets: [
      {
        label: 'Total Facturado',
        data,
        backgroundColor: '#f59e0b',
        borderRadius: 6,
      },
    ],
  };
});

const chartFinanzasData = computed(() => {
  const defaultData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Cobros',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
      {
        label: 'Gastos',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
      {
        label: 'Balance en caja',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };

  if (!stats.value?.historical_data?.deliveries) {
    return defaultData;
  }

  const deliveries = stats.value.historical_data.deliveries;
  const labels = deliveries.map((d) => d.date);

  // Para el gráfico de finanzas, usamos los totales del período
  const payments = [stats.value.debt_payments];
  const expenses = [stats.value.company_bills];
  const balance = [stats.value.cash_balance];

  return {
    labels,
    datasets: [
      {
        label: 'Cobros',
        data: payments,
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
      {
        label: 'Gastos',
        data: expenses,
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
      {
        label: 'Balance en caja',
        data: balance,
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };
});

function chartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#6b7280',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#6b7280',
        },
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function (tickValue: number | string) {
            return `${tickValue}`;
          },
          color: '#6b7280',
        },
      },
    },
  };
}
</script>
