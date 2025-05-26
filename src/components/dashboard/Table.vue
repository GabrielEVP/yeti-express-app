<template>
  <Card class="mt-8">
    <Table>
      <TableHead>
        <TableRow>
          <TableContent v-for="(header, index) in headers" :key="index">
            <div class="flex items-center h-12">
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

    <div
      class="flex items-center justify-between px-6 py-3 border-t border-gray-200 dark:border-gray-700"
    >
      <div class="text-xs text-gray-500 dark:text-gray-400">
        Mostrando {{ startIndex + 1 }} a {{ endIndex }} de {{ totalItems }} resultados
      </div>
      <div class="flex gap-2">
        <button
          @click="emit('updatePage', currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 h-8 text-xs font-medium rounded-md text-gray-900 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-1.5"
        >
          <ChevronLeft class="h-4 w-4" />
          Anterior
        </button>
        <button
          @click="emit('updatePage', currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 h-8 text-xs font-medium rounded-md text-gray-900 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:bg-transparent transition-colors flex items-center gap-1.5"
        >
          Siguiente
          <ChevronRight class="h-4 w-4" />
        </button>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { ref, PropType } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { ChevronLeft, ChevronRight, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-vue-next';
import { Card, Table, TableBody, TableContent, TableHead, TableRow } from '@/components';

const props = defineProps({
  headers: {
    type: Array as PropType<Array<{ label: string; key: string; sortable?: boolean }>>,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  startIndex: {
    type: Number,
    required: true,
  },
  endIndex: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['updatePage', 'sort']);
const sortConfig = ref<{ column: string; order: 'asc' | 'desc' } | null>(null);

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
</script>
