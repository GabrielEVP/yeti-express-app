<template>
  <Sidebar>
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <ActivityView title="Ordenes realizadas">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">158</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">12% mas que ayer</p>
      </ActivityView>
      <ActivityView title="Total Facturado">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$12.400</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">12% mas que ayer</p>
      </ActivityView>
      <ActivityView title="Cobros">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$8.900</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">12% mas que ayer</p>
      </ActivityView>
      <ActivityView title="Gastos">
        <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">$3.100</div>
        <p class="text-xs text-gray-500 dark:text-gray-400">12% mas que ayer</p>
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
          <Bar :data="chartPedidosData" :options="chartOptions()" />
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
          <Bar :data="chartMontosData" :options="chartOptions()" />
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
      <div>
        <Bar class="min-h-[300px]" :data="chartFinanzasData" :options="chartOptions()" />
      </div>
    </Card>
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/layouts/BarLayourt.vue';
import { Card, ActivityView } from '@/components/';
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

const rangePedidos = ref<'day' | 'week' | 'month' | 'year'>('week');
const rangeMontos = ref<'day' | 'week' | 'month' | 'year'>('week');
const rangeFinanzas = ref<'day' | 'week' | 'month' | 'year'>('week');

const pedidosData = {
  day: {
    labels: ['00:00', '06:00', '12:00', '18:00'],
    data: [2, 3, 8, 5],
  },
  week: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    data: [12, 14, 18, 16, 22, 25, 15],
  },
  month: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    data: [58, 67, 72, 65],
  },
  year: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [200, 240, 280, 220, 300, 260],
  },
};

const montosData = {
  day: {
    labels: ['00:00', '06:00', '12:00', '18:00'],
    data: [200, 300, 800, 500],
  },
  week: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    data: [1200, 1400, 1800, 1600, 2200, 2500, 1500],
  },
  month: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    data: [5800, 6700, 7200, 6500],
  },
  year: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    data: [20000, 24000, 28000, 22000, 30000, 26000],
  },
};

const finanzasData = {
  day: {
    labels: ['00:00', '06:00', '12:00', '18:00'],
    ingresos: [150, 200, 600, 400],
    pagos: [50, 80, 200, 150],
  },
  week: {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    ingresos: [890, 950, 880, 920, 1100, 1200, 800],
    pagos: [310, 320, 300, 340, 380, 420, 280],
  },
  month: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    ingresos: [4500, 4400, 4800, 4200],
    pagos: [1700, 1800, 1900, 1600],
  },
  year: {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    ingresos: [15000, 16000, 17000, 14000, 18000, 16500],
    pagos: [6200, 6100, 6800, 5900, 7200, 6600],
  },
};

const chartPedidosData = computed(() => ({
  labels: pedidosData[rangePedidos.value].labels,
  datasets: [
    {
      label: 'Ordenes realizadas',
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
      label: 'Total Facturado',
      data: montosData[rangeMontos.value].data,
      backgroundColor: '#f59e0b',
      borderRadius: 6,
    },
  ],
}));

const chartFinanzasData = computed(() => {
  const currentData = finanzasData[rangeFinanzas.value];
  const diferencia = currentData.ingresos.map(
    (ingreso, index) => ingreso - currentData.pagos[index]
  );

  return {
    labels: currentData.labels,
    datasets: [
      {
        label: 'Cobros',
        data: currentData.ingresos,
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
      {
        label: 'Gastos',
        data: currentData.pagos,
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
      {
        label: 'Balance en caja',
        data: diferencia,
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
