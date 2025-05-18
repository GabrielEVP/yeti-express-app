<template>
   <div class="p-6 pt-0 h-80">
      <Bar :data="data" :options="option" />
   </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Bar } from "vue-chartjs";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

defineProps<{
   data: BarChartData;
}>();

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export interface BarChartData {
   labels: string[];
   datasets: Array<{
      label: string;
      backgroundColor: string;
      data: number[];
      borderRadius: number;
   }>;
}

const isDarkMode = document.documentElement.classList.contains("dark");

const option = {
   responsive: true,
   maintainAspectRatio: false,
   scales: {
      y: {
         beginAtZero: true,
         grid: {
            color: isDarkMode ? "#4B5563" : "#E5E7EB",
         },
      },
      x: {
         grid: {
            color: isDarkMode ? "#4B5563" : "#E5E7EB",
         },
      },
   },
};
</script>
