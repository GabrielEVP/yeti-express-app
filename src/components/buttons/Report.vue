<template>
  <div class="relative" ref="dropdownRef">
    <Button
      ref="target"
      @click="openDropdown = !openDropdown"
      class="bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 dark:from-slate-700 dark:to-slate-800 dark:hover:from-slate-800 dark:hover:to-slate-900 text-white gap-3 w-full justify-between px-6 py-4 text-lg font-medium shadow-lg"
      :class="{ 'rounded-b-none shadow-2xl': openDropdown }"
    >
      <div class="flex items-center gap-3">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span class="font-semibold">Reportes</span>
      </div>
      <div class="flex items-center gap-2">
        <svg
          class="w-5 h-5 transition-transform duration-300 ease-in-out"
          :class="{ 'rotate-180': openDropdown }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </Button>
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 transform scale-95 translate-y-2"
      enter-to-class="opacity-100 transform scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 transform scale-100 translate-y-0"
      leave-to-class="opacity-0 transform scale-95 translate-y-2"
    >
      <div
        v-show="openDropdown"
        class="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-b-xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm min-w-full"
        style="min-width: max-content"
      >
        <div
          class="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-600 border-b border-gray-200 dark:border-slate-500"
        >
          <h3 class="text-sm font-semibold text-gray-700 dark:text-slate-200 uppercase tracking-wide">Tipos de Reportes</h3>
        </div>
        <div class="max-h-96 overflow-y-auto">
          <slot />
        </div>
        <div class="px-6 py-3 bg-gray-50 dark:bg-slate-700 border-t border-gray-200 dark:border-slate-600">
          <p class="text-xs text-gray-500 dark:text-slate-400 text-center break-all">Selecciona el tipo de reporte</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { Button } from '@components';
import { onClickOutside } from '@vueuse/core';

const openDropdown = ref(false);

const closeDropdown = () => {
  openDropdown.value = false;
};

const target = useTemplateRef<HTMLElement>('target');
onClickOutside(target, closeDropdown);
</script>
