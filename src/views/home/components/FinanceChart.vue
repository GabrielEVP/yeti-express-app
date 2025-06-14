<template>
  <Card class="p-8">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Balance en caja</h2>
    </div>
    <div class="relative min-h-[300px]">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
      <Bar v-else :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '@/components/';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import type { HistoricalBalance } from '@views/home/';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  totalCollected: number;
  totalCompanyBills: number;
  totalInvoiced: number;
  historicalBalance: HistoricalBalance[];
  isLoading: boolean;
}>();

const chartData = computed(() => {
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
        label: 'Facturado',
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };

  if (!props.historicalBalance?.length) {
    return defaultData;
  }

  const labels = props.historicalBalance.map((b) => b.date);
  const collectedData = props.historicalBalance.map((b) => b.total_collected);
  const expensesData = props.historicalBalance.map((b) => b.total_expenses);
  const balanceData = props.historicalBalance.map((b) => b.balance);

  return {
    labels,
    datasets: [
      {
        label: 'Ingresos',
        data: collectedData,
        backgroundColor: '#3b82f6',
        borderRadius: 6,
      },
      {
        label: 'Gastos',
        data: expensesData,
        backgroundColor: '#ef4444',
        borderRadius: 6,
      },
      {
        label: 'Balance',
        data: balanceData,
        backgroundColor: '#10b981',
        borderRadius: 6,
      },
    ],
  };
});

const chartOptions = {
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
          return `$${tickValue}`;
        },
        color: '#6b7280',
      },
    },
  },
};
</script>
