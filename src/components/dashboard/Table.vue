<template>
  <Card class="mt-8">
    <div class="hidden lg:block overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableContent
              v-for="(header, index) in headers"
              :key="index"
              :class="getHeaderAlignment(header.position)"
            >
              <div class="flex items-center h-12" :class="getHeaderFlexAlignment(header.position)">
                <div
                  class="flex cursor-pointer"
                  v-if="header.sortable"
                  @click="toggleSort(header.key)"
                >
                  <span class="mr-2">{{ header.label }}</span>
                  <component :is="getSortIcon(header.key)" class="w-4 h-4 text-blue-700" />
                </div>
                <div v-else>{{ header.label }}</div>
              </div>
            </TableContent>
            <TableContent
              class="text-center px-6 py-3 text-xs font-semibold text-gray-600 dark:text-gray-300"
            >
              Acciones
            </TableContent>
          </TableRow>
        </TableHead>
        <TableBody>
          <slot></slot>
        </TableBody>
      </Table>
    </div>
    <div class="lg:hidden">
      <div
        class="p-4 border-b border-gray-200 dark:border-gray-700"
        v-if="sortableHeaders.length > 0"
      >
        <div class="flex flex-wrap gap-2">
          <button
            v-for="header in sortableHeaders"
            :key="header.key"
            @click="toggleSort(header.key)"
            class="flex items-center gap-1 px-3 py-2 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{{ header.label }}</span>
            <component
              :is="getSortIcon(header.key)"
              class="w-3 h-3 text-blue-700 dark:text-blue-200"
            />
          </button>
        </div>
      </div>
      <slot name="mobile" :headers="headers" :sort-config="sortConfig">
        <div class="p-4">
          <slot name="mobile-rows" v-if="$slots['mobile-rows']"></slot>
        </div>
      </slot>
    </div>
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-3 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
        <span class="hidden sm:inline"
          >Mostrando {{ startIndex + 1 }} a {{ endIndex }} de {{ totalItems }} resultados</span
        >
        <span class="sm:hidden">{{ startIndex + 1 }}-{{ endIndex }} de {{ totalItems }}</span>
      </div>
      <div class="flex gap-2 items-center">
        <button
          @click="emit('updatePage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 h-8 text-xs font-medium rounded-md text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-1.5"
        >
          <ChevronLeft class="h-4 w-4" />
          <span class="hidden sm:inline">Anterior</span>
        </button>
        <div
          class="sm:hidden flex items-center px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md"
        >
          {{ currentPage }} / {{ totalPages }}
        </div>
        <button
          @click="emit('updatePage', currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 h-8 text-xs font-medium rounded-md text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-1.5"
        >
          <span class="hidden sm:inline">Siguiente</span>
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-vue-next';
import { Card, Table, TableBody, TableContent, TableHead, TableRow } from '@/components';

type HeaderPosition = 'left' | 'center' | 'right';

interface TableHeader {
  label: string;
  key: string;
  position?: HeaderPosition;
  sortable?: boolean;
}

const props = defineProps<{
  headers: any[];
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
}>();

const emit = defineEmits(['updatePage', 'sort']);

const sortConfig = ref<{ column: string; order: 'asc' | 'desc' } | null>(null);

const sortableHeaders = computed(() => props.headers.filter((header) => header.sortable));

function toggleSort(headerKey: string) {
  const header = props.headers.find((h) => h.key === headerKey);
  if (!header?.sortable) return;

  if (sortConfig.value?.column === headerKey) {
    sortConfig.value.order = sortConfig.value.order === 'asc' ? 'desc' : 'asc';
  } else {
    sortConfig.value = { column: headerKey, order: 'desc' };
  }

  emit('sort', sortConfig.value);
}

function getSortIcon(headerKey: string) {
  if (sortConfig.value?.column === headerKey) {
    return sortConfig.value.order === 'asc' ? ChevronUp : ChevronDown;
  }
  return ChevronsUpDown;
}

function getHeaderAlignment(position?: HeaderPosition): string {
  switch (position) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left'; // Por defecto alineado a la izquierda
  }
}

function getHeaderFlexAlignment(position?: HeaderPosition): string {
  switch (position) {
    case 'left':
      return 'justify-start';
    case 'center':
      return 'justify-center';
    case 'right':
      return 'justify-end';
    default:
      return 'justify-start'; // Por defecto alineado a la izquierda
  }
}
</script>
