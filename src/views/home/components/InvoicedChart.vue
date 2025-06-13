<template>
  <Card class="p-8">
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Total Facturado</h2>
    </div>
    <div class="relative h-[300px] w-full">
      <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
      <Bar v-else :data="chartData" :options="chartOptions" />
    </div>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Card } from '@/components/';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import type { HistoricalInvoiced } from '@views/home/domain/DashboardStats';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  deliveries: HistoricalInvoiced[];
  isLoading: boolean;
}>();

const chartData = computed(() => {
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

  if (!props.deliveries?.length) {
    return defaultData;
  }

  const labels = props.deliveries.map((d) => d.date);
  const data = props.deliveries.map((d) => d.total);

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
