<template>
  <Sidebar>
    <GlobalFilter
      :initial-range="selectedRange"
      :initial-date="selectedDate"
      @filter-change="onFilterChange"
    />
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
            ${{ formatNumber(stats?.total_collected || 0) }}
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
            ${{ formatNumber(stats?.total_company_bills || 0) }}
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400">Gastos totales</p>
        </template>
      </ActivityView>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <DeliveriesChart :deliveries="stats?.historical_delivered || []" :is-loading="isLoading" />
      <InvoicedChart :deliveries="stats?.historical_invoiced || []" :is-loading="isLoading" />
    </div>
    <FinanceChart
      :total-collected="stats?.total_collected || 0"
      :total-company-bills="stats?.total_company_bills || 0"
      :total-invoiced="stats?.total_invoiced || 0"
      :historical-balance="stats?.historical_balance || []"
      :is-loading="isLoading"
      class="mt-4"
    />
  </Sidebar>
</template>

<script setup lang="ts">
import Sidebar from '@/layouts/BarLayourt.vue';
import { Card, ActivityView } from '@/components/';
import { ref, onMounted } from 'vue';
import { GetDashboardStatsUseCase } from '@views/home/application/GetDashboardStatsUseCase';
import { DashboardApi } from '@views/home/infrastructure/Dashboard.Api';
import type { DashboardStats } from '@views/home/domain/DashboardStats';
import DeliveriesChart from './components/DeliveriesChart.vue';
import InvoicedChart from './components/InvoicedChart.vue';
import FinanceChart from './components/FinanceChart.vue';
import GlobalFilter from './components/GlobalFilter.vue';

const selectedRange = ref<'day' | 'week' | 'month' | 'year'>('week');
const selectedDate = ref(new Date().toISOString().split('T')[0]);
const stats = ref<DashboardStats | null>(null);
const isLoading = ref(false);

const getDashboardStatsUseCase = new GetDashboardStatsUseCase(DashboardApi);

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
    const response = await getDashboardStatsUseCase.execute({ period, date });
    console.log('API Response:', response);

    if (!response?.historical_delivered?.length) {
      console.warn('API response missing historical data');
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
