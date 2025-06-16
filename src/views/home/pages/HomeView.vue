<template>
  <Sidebar>
    <GlobalFilter :initial-range="selectedRange" :initial-date="selectedDate" @filter-change="onFilterChange" />
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
      <ActivityView title="Ordenes realizadas">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
            {{ stats?.total_delivered || 0 }}
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
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">${{ formatNumber(stats?.total_invoiced || 0) }}</div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Ingresos totales</p>
        </template>
      </ActivityView>
      <ActivityView title="Cobros">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">${{ formatNumber(stats?.total_collected || 0) }}</div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Pagos recibidos</p>
        </template>
      </ActivityView>
      <ActivityView title="Gastos">
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2"></div>
        </div>
        <template v-else>
          <div class="text-3xl font-extrabold text-gray-800 dark:text-gray-100">${{ formatNumber(stats?.total_company_bills || 0) }}</div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Gastos totales</p>
        </template>
      </ActivityView>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <DeliveriesChart :deliveries="stats?.historical_delivered || []" :is-loading="isLoading" />
      <InvoicedChart :deliveries="stats?.historical_invoiced || []" :is-loading="isLoading" />
    </div>
    <FinanceChart
      :historical-balance="stats?.historical_balance || []"
      :is-loading="isLoading"
      class="mt-4"
    />
  </Sidebar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Sidebar from '@/layouts/BarLayourt.vue';
import { ActivityView } from '@/components/';
import DeliveriesChart from '../components/DeliveriesChart.vue';
import InvoicedChart from '../components/InvoicedChart.vue';
import FinanceChart from '../components/FinanceChart.vue';
import GlobalFilter from '../components/GlobalFilter.vue';
import type { DashboardStats } from '@views/home/';
import { getStats } from '@views/home/';

const selectedRange = ref<'day' | 'week' | 'month' | 'year'>('week');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const stats = ref<DashboardStats | null>(null);
const isLoading = ref(false);

const formatNumber = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const onFilterChange = (range: 'day' | 'week' | 'month' | 'year', date: string) => {
  selectedRange.value = range;
  selectedDate.value = date;
  fetchStats(range, date);
};

const fetchStats = async (period: string, date: string) => {
  isLoading.value = true;
  try {
    const response = await getStats({ period, date });

    if (!response?.historical_delivered?.length) {
      stats.value = {
        ...response,
        historical_delivered: [{ date: 'Hoy', total: 0 }],
        historical_invoiced: [{ date: 'Hoy', total: 0 }],
        historical_balance: [
          {
            date: 'Hoy',
            total_collected: 0,
            total_expenses: 0,
            balance: 0,
          },
        ],
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

onMounted(() => {
  fetchStats(selectedRange.value, selectedDate.value);
});
</script>
