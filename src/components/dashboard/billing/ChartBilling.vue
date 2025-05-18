<template>
   <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2">
      <div v-if="documents.length > 0" class="p-6">
         <h3 class="text-lg font-medium text-gray-800 dark:text-gray-100">
            {{ title }}
         </h3>
      </div>
      <div class="p-6 pt-0 h-80">
         <BarChart v-if="documents.length > 0 && showChart" :data="chartData" />
         <EmptyData v-else />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from "vue";
import { BarChart, EmptyData } from "@/components/";
import { BarChartData } from "@components/ui/charts/Bar.vue";

const showChart = ref(false);
onMounted(() => {
   showChart.value = true;
});

interface ChartableDocument {
   date: string;
   totalTaxAmount: number;
}

type ChartProps<T> = {
   title: string;
   label?: string;
   documents: T[];
};

const props = defineProps<ChartProps<ChartableDocument>>();

function mapDocumentsToBarChartData<T extends ChartableDocument>(documents: T[] = [], label = "Facturación Mensual"): BarChartData {
   const groupedByMonth: Record<string, number> = {};

   for (const doc of documents) {
      const date = new Date(doc.date);
      if (isNaN(date.getTime())) continue;

      const month = date.toLocaleDateString("default", {
         month: "short",
         year: "numeric",
      });

      const amount = Number(doc.totalTaxAmount);
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
            backgroundColor: "#10b981",
            borderRadius: 8,
            data,
         },
      ],
   };
}

const chartData = computed(() => {
   const data = mapDocumentsToBarChartData(props.documents, props.label);
   return data.datasets.length > 0 ? data : { labels: [], datasets: [] };
});
</script>
