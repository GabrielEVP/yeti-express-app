<template>
  <div class="h-[500px] w-full">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
  dataset: {
    type: Object,
    required: true,
  },
});

const chartRef = ref(null);

onMounted(() => {
  const ctx = chartRef.value.getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [props.dataset],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: document.documentElement.classList.contains("dark")
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            color: document.documentElement.classList.contains("dark")
              ? "#9ca3af"
              : "#4b5563",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: document.documentElement.classList.contains("dark")
              ? "#9ca3af"
              : "#4b5563",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
});
</script>
