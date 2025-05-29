<template>
  <sidebar class="bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
    <div class="grid grid-cols-4 gap-4 mb-8">
      <ActivityView title="Pedidos Hoy">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">158</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Porcentaje de ganancia: 12%</p>
      </ActivityView>
      <ActivityView title="Monto de los pedidos en bruto">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$12.400</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Porcentaje de ganancia: 18%</p>
      </ActivityView>
      <ActivityView title="Cobros">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$8.900</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Porcentaje de efectividad: 85%</p>
      </ActivityView>
      <ActivityView title="Pagos a repartidores">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$3.100</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">Balance neto: positivo</p>
      </ActivityView>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Pedidos realizados</h2>
          <select
            v-model="rangePedidos"
            class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>
        <div class="relative h-[300px] w-full">
          <Bar :data="chartPedidosData" :options="chartOptions('Pedidos')" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Montos en bruto</h2>
          <select
            v-model="rangeMontos"
            class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>
        <div class="relative h-[300px] w-full">
          <Bar :data="chartMontosData" :options="chartOptions('Montos ($)')" />
        </div>
      </div>
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow p-4 col-span-1 md:col-span-2"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Cobros vs Pagos</h2>
          <select
            v-model="rangeFinanzas"
            class="border border-gray-300 dark:border-gray-600 rounded p-1 text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            <option value="week">Semana</option>
            <option value="month">Mes</option>
            <option value="year">Año</option>
          </select>
        </div>
        <div class="relative h-[300px] w-full">
          <Bar :data="chartFinanzasData" :options="chartOptions('Ingresos vs Pagos ($)')" />
        </div>
      </div>
    </div>
  </sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/layouts/BarLayourt.vue';
import { ActivityView } from '@/components/';
import { ref, computed } from 'vue';
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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const rangePedidos = ref<'week' | 'month' | 'year'>('week');
const rangeMontos = ref<'week' | 'month' | 'year'>('week');
const rangeFinanzas = ref<'week' | 'month' | 'year'>('week');

const pedidosData = {
  week: {
    labels: ['Lun', 'Mar', 'Mié', 'jueve', 'vierne', 'sabado', 'domingo'],
    data: [12, 14, 18, 18, 18, 18, 18],
  },
  month: { labels: ['Semana 1', 'Semana 2'], data: [58, 67] },
  year: { labels: ['Ene', 'Feb'], data: [200, 240] },
};

const montosData = {
  week: { labels: ['Lun', 'Mar', 'Mié'], data: [1200, 1400, 1800] },
  month: { labels: ['Semana 1', 'Semana 2'], data: [5800, 6700] },
  year: { labels: ['Ene', 'Feb'], data: [20000, 24000] },
};

const finanzasData = {
  week: {
    labels: ['Lun', 'Mar', 'Mié'],
    ingresos: [890, 950, 880],
    pagos: [310, 320, 300],
  },
  month: {
    labels: ['Semana 1', 'Semana 2'],
    ingresos: [4500, 4400],
    pagos: [1700, 1800],
  },
  year: {
    labels: ['Ene', 'Feb'],
    ingresos: [15000, 16000],
    pagos: [6200, 6100],
  },
};

const chartPedidosData = computed(() => ({
  labels: pedidosData[rangePedidos.value].labels,
  datasets: [
    {
      label: 'Pedidos',
      data: pedidosData[rangePedidos.value].data,
      backgroundColor: '#6366f1',
      borderRadius: 6,
    },
  ],
}));

const chartMontosData = computed(() => ({
  labels: montosData[rangeMontos.value].labels,
  datasets: [
    {
      label: 'Montos en bruto ($)',
      data: montosData[rangeMontos.value].data,
      backgroundColor: '#f59e0b',
      borderRadius: 6,
    },
  ],
}));

const chartFinanzasData = computed(() => ({
  labels: finanzasData[rangeFinanzas.value].labels,
  datasets: [
    {
      label: 'Cobros a clientes ($)',
      data: finanzasData[rangeFinanzas.value].ingresos,
      backgroundColor: '#3b82f6',
      borderRadius: 6,
    },
    {
      label: 'Pagos a repartidores ($)',
      data: finanzasData[rangeFinanzas.value].pagos,
      backgroundColor: '#ef4444',
      borderRadius: 6,
    },
  ],
}));

function chartOptions(title: string) {
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
      title: {
        display: true,
        text: title,
        color: '#111827',
        font: { size: 16 },
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
            return `$${tickValue}`;
          },
          color: '#6b7280',
        },
      },
    },
  };
}
</script>
