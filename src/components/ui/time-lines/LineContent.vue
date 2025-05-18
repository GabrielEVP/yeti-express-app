<template>
  <li>
    <div class="flex-start md:flex">
      <div
        class="-ms-[13px] h-[25px] w-[25px] flex items-center justify-center rounded-full bg-info-100 text-info-700"
      >
        <component
          :is="icon"
          class="p-1 dark:text-black mt-2 rounded-full bg-gray-200"
        />
      </div>
      <div class="mb-12 ms-6 block">
        <slot></slot>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
  icon: any;
}

const props = defineProps<Props>();
</script>
