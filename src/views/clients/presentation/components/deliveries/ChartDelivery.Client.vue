<template>
  <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
    <div v-if="deliveries.length > 0" class="p-6">
      <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">
        {{ title }}
      </h3>
    </div>
    <div class="p-6 pt-0 h-80">
      <BarChart v-if="deliveries.length > 0 && showChart" :data="chartData" />
      <EmptyData v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from 'vue';
import { BarChart, EmptyData } from '@/components/';
import type { BarChartData } from '@components/ui/charts/Bar.vue';
import type { Delivery } from '@/views/deliveries/domain/Delivery';

const showChart = ref(false);
onMounted(() => {
  showChart.value = true;
});

type ChartProps = {
  title: string;
  label?: string;
  deliveries: Delivery[];
};

const props = defineProps<ChartProps>();

function mapDeliveriesToBarChartData(
  deliveries: Delivery[] = [],
  label = 'Ganancias Mensual de deliverys'
): BarChartData {
  const groupedByMonth: Record<string, number> = {};

  for (const delivery of deliveries) {
    const date = delivery.getDate();
    if (!(date instanceof Date) || isNaN(date.getTime())) continue;

    const month = date.toLocaleDateString('default', {
      month: 'short',
      year: 'numeric',
    });

    const amount = delivery.getAmount();
    if (isNaN(amount)) continue;

    groupedByMonth[month] = (groupedByMonth[month] || 0) + amount;
  }

  const labels = Object.keys(groupedByMonth);
  const data = Object.values(groupedByMonth);

  return {
    labels,
    datasets: [
      {
        label,
        backgroundColor: '#10b981',
        borderRadius: 8,
        data,
      },
    ],
  };
}

const chartData = computed(() => {
  const data = mapDeliveriesToBarChartData(props.deliveries, props.label);
  return data.datasets.length > 0 ? data : { labels: [], datasets: [] };
});
</script>
