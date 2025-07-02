<template>
  <ModalDetail v-if="billData" :is-open="isOpen" @close="handleCloseModal">
    <div class="relative overflow-hidden">
      <ModalTitleModal>Detalle del Gasto</ModalTitleModal>
      <div class="relative px-8 py-8 space-y-8">
        <div class="text-center py-6 relative">
          <div class="relative">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">Monto Total</p>
            <div class="relative inline-block">
              <p class="text-4xl font-black  text-black dark:text-white ">
                {{ formatToDollars(billData.amount) }}
              </p>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="space-y-5">
            <ModalContentItem>
              <template #title>Nombre</template>
              <template #content>{{ billData.name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha</template>
              <template #content>{{ formatDateCustom(billData.date) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Metodo</template>
              <template #content>{{ formatPaymentMethod(billData.method) }}</template>
            </ModalContentItem>
          </div>
        </div>
        <ModalSpecialContentItem>
          <template #title>Descripción</template>
          <template #content>{{ billData.description }}</template>
        </ModalSpecialContentItem>
      </div>
    </div>
  </ModalDetail>
</template>

<script setup lang="ts">
import { formatDateCustom, formatToDollars } from '@/utils/';
import {  ModalDetail, ModalContentItem, ModalSpecialContentItem, ModalTitleModal } from '@/components/';
import { CompanyBill, formatPaymentMethod } from '@/views/company-bills/';

defineProps<{
  isOpen: boolean;
  billData: CompanyBill | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
