<template>
   <sidebar>
      <div class="p-6 space-y-6">
         <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetriCard v-for="(metric, index) in topMetrics" :key="index" :metric="metric" />
         </div>

         <div class="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-100 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
               <h2 class="text-sm text-gray-600 dark:text-gray-400">Total Facturas</h2>
               <div class="flex items-center space-x-2 text-xs">
                  <LegendItem label="This year" colorClass="bg-gray-800 dark:bg-gray-200" />
                  <LegendItem label="Last year" colorClass="bg-gray-300 dark:bg-gray-600" />
               </div>
            </div>
            <div class="relative min-h-64 w-full">
               <Line v-if="showChart" :data="chartData" :options="chartOptions" />
            </div>
         </div>

         <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetriCard v-for="(metric, index) in bottomMetrics" :key="index" :metric="metric" />
         </div>
      </div>
   </sidebar>
</template>

<script setup lang="ts">
import Sidebar from "@components/ui/sidebars/Sidebar.vue";
import MetriCard from "@/views/home/components/MetriCard.vue";
import LegendItem from "@/views/home/components/LegendItem.vue";
import { reactive, computed, onMounted, ref } from "vue";
import { Line } from "vue-chartjs";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const topMetrics = [
   { label: "Facturas", value: 7265, percentage: 11.01 },
   { label: "Facturas Recurrentes", value: 7265, percentage: 11.01 },
   { label: "Clientes", value: 7265, percentage: 11.01 },
   { label: "Presupuestos", value: 7265, percentage: 11.01 },
];

const bottomMetrics = [
   { label: "Compras", value: 7265, percentage: 11.01 },
   { label: "Compras Recurrentes", value: 7265, percentage: 11.01 },
   { label: "Productos", value: 7265, percentage: 11.01 },
   { label: "Proveedores", value: 7265, percentage: 11.01 },
];

const isDarkMode = computed(() => document.documentElement.classList.contains("dark"));

const chartColors = computed(() => ({
   thisYear: isDarkMode.value ? "#e5e7eb" : "#4c9141",
   lastYear: isDarkMode.value ? "#4b5563" : "#d1d5db",
   tooltipBg: isDarkMode.value ? "#374151" : "white",
   tooltipTitle: isDarkMode.value ? "#e5e7eb" : "black",
   tooltipBody: isDarkMode.value ? "#e5e7eb" : "black",
   tooltipBorder: isDarkMode.value ? "#4b5563" : "#e5e7eb",
   xTicks: isDarkMode.value ? "#9ca3af" : "#6b7280",
   yGrid: isDarkMode.value ? "#374151" : "#f3f4f6",
   yTicks: isDarkMode.value ? "#9ca3af" : "#6b7280",
}));

const chartData = reactive({
   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
   datasets: [
      {
         label: "This year",
         data: [15000, 21000, 18000, 25000, 23000, 28000, 30000],
         borderColor: chartColors.value.thisYear,
         backgroundColor: chartColors.value.thisYear,
         tension: 0.4,
         borderWidth: 2,
      },
      {
         label: "Last year",
         data: [12000, 19000, 16000, 20000, 18000, 22000, 25000],
         borderColor: chartColors.value.lastYear,
         backgroundColor: chartColors.value.lastYear,
         borderDash: [5, 5],
         tension: 0.4,
         borderWidth: 2,
      },
   ],
});

const showChart = ref(false);
onMounted(() => {
   showChart.value = true;
});

const chartOptions = reactive({
   animation: true,
   responsive: true,
   maintainAspectRatio: false,
   plugins: {
      legend: { display: false },
      tooltip: {
         mode: "index",
         intersect: false,
         backgroundColor: chartColors.value.tooltipBg,
         titleColor: chartColors.value.tooltipTitle,
         bodyColor: chartColors.value.tooltipBody,
         borderColor: chartColors.value.tooltipBorder,
         borderWidth: 1,
         padding: 12,
         displayColors: false,
      },
   },
   scales: {
      x: {
         grid: { display: false },
         ticks: { color: chartColors.value.xTicks },
      },
      y: {
         grid: { color: chartColors.value.yGrid },
         ticks: {
            color: chartColors.value.yTicks,
            callback: (value: number) => value.toLocaleString(),
         },
         border: { dash: [5, 5] },
      },
   },
   interaction: { intersect: false, mode: "index" },
});
</script>
