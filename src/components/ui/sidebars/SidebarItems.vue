<template>
  <div class="relative group" ref="elementRef">
    <router-link :to="item.route">
      <div class="relative flex items-center p-3 rounded-xl transition-all duration-200 w-full hover:bg-gray-100 dark:hover:bg-gray-700">
        <component
          :is="item.icon"
          class="w-6 h-6 flex-shrink-0 text-black dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400"
        />
      </div>
    </router-link>
    <div
      class="fixed py-1 px-4 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 whitespace-nowrap pointer-events-none"
      :style="tooltipStyles"
    >
      {{ item.title }}
      <div class="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

defineProps<{
  item: { route: string; title: string; icon: any };
}>();

const elementRef = ref<HTMLElement>();
const tooltipPosition = ref({ top: 0, left: 0 });

const tooltipStyles = computed(() => ({
  top: `${tooltipPosition.value.top}px`,
  left: `${tooltipPosition.value.left}px`,
  zIndex: 9999,
}));

const updateTooltipPosition = async () => {
  await nextTick();
  if (elementRef.value) {
    const rect = elementRef.value.getBoundingClientRect();
    tooltipPosition.value = {
      top: rect.top + rect.height / 2 - 16,
      left: rect.right + 8,
    };
  }
};

let rafId: number | null = null;
const throttledUpdate = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    updateTooltipPosition();
    rafId = null;
  });
};

onMounted(() => {
  updateTooltipPosition();

  window.addEventListener('scroll', throttledUpdate, true);
  window.addEventListener('resize', throttledUpdate);

  const observer = new ResizeObserver(() => {
    throttledUpdate();
  });

  if (elementRef.value) {
    observer.observe(elementRef.value);
  }

  onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('scroll', throttledUpdate, true);
    window.removeEventListener('resize', throttledUpdate);
    if (rafId) {
      cancelAnimationFrame(rafId);
    }
  });
});
</script>
