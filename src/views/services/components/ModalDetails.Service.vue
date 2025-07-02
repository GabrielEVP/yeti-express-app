<template>
  <ModalDetail v-if="serviceData" :is-open="isOpen" @close="handleCloseModal">
    <div class="relative overflow-hidden">
      <ModalTitleModal>Detalle del Servicio</ModalTitleModal>
      <div class="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div class="text-center py-4 sm:py-6 relative">
          <div class="relative">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">Monto</p>
            <div class="relative inline-block">
              <p class="text-3xl sm:text-4xl font-black text-black dark:text-white">
                {{ formatToDollars(serviceData.amount) }}
              </p>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="space-y-4 sm:space-y-5">
            <ModalContentItem>
              <template #title>Nombre</template>
              <template #content>{{ serviceData.name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Total de gastos</template>
              <template #content>{{ formatToDollars(serviceData.totalExpense ?? 0) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Total de ganancias</template>
              <template #content>{{ formatToDollars(serviceData.totalEarning ?? 0) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Creación</template>
              <template #content>{{ formatDateCustom(serviceData.createdAt) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Actualización</template>
              <template #content>{{ formatDateCustom(serviceData.updatedAt) }}</template>
            </ModalContentItem>
          </div>
        </div>
        <ModalSpecialContentItem>
          <template #title>Descripción</template>
          <template #content>{{ serviceData.description }}</template>
        </ModalSpecialContentItem>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <ReceiptText class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white"> Gastos ({{ serviceData.bills.length }}) </span>
          </div>
          <div v-if="serviceData.bills.length > 0" class="space-y-3">
            <div>
              <div class="hidden lg:grid lg:grid-cols-2 gap-4 pb-3 mb-4 border-b border-gray-200 dark:border-gray-600">
                <div class="font-semibold text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">Nombre</div>
                <div class="font-semibold text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide text-right">Monto</div>
              </div>
              <div class="space-y-2">
                <div
                  v-for="bill in serviceData.bills"
                  :key="bill.id"
                  class="group hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl p-3 sm:p-4 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0 lg:border-b-0 lg:hover:shadow-sm"
                >
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-4 lg:items-center">
                    <div class="space-y-1">
                      <p class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {{ bill.name }}
                      </p>
                    </div>
                    <div class="flex items-center justify-between sm:justify-end">
                      <span class="text-xs text-gray-500 dark:text-gray-400 font-medium sm:hidden">Monto:</span>
                      <span class="font-bold text-lg sm:text-xl text-emerald-600 dark:text-emerald-400">
                        {{ formatToDollars(bill.amount) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <EmptyData v-else class="mt-6 sm:mt-10" />
        </div>
      </div>
    </div>
  </ModalDetail>
</template>

<script setup lang="ts">
import { formatDateCustom, formatToDollars } from '@/utils/';
import { EmptyData, ModalContentItem, ModalDetail, ModalSpecialContentItem, ModalTitleModal } from '@/components/';
import { ReceiptText } from 'lucide-vue-next';
import { Service } from '@/views/services/models/';

defineProps<{
  isOpen: boolean;
  serviceData: Service | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
