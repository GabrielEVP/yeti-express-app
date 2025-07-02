<template>
  <ModalDetail v-if="courierData" :is-open="isOpen" @close="handleCloseModal">
    <div class="relative overflow-hidden">
      <ModalTitleModal>Detalle del Repartidor</ModalTitleModal>
      <div class="relative px-8 py-8 space-y-8">
        <div class="text-center py-6 relative">
          <div class="relative">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">Nombre</p>
            <div class="relative inline-block">
              <p class="text-4xl font-black text-black dark:text-white">{{ courierData.firstName }} {{ courierData.lastName }}</p>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="space-y-5">
            <ModalContentItem>
              <template #title>Teléfono</template>
              <template #content>{{ courierData.phone }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Creación</template>
              <template #content>{{ formatDateCustom(courierData.createdAt) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Actualización</template>
              <template #content>{{ formatDateCustom(courierData.updatedAt) }}</template>
            </ModalContentItem>
          </div>
        </div>
      </div>
    </div>
  </ModalDetail>
</template>

<script setup lang="ts">
import { formatDateCustom } from '@/utils/';
import { ModalContentItem, ModalDetail, ModalTitleModal } from '@/components/';
import { Courier } from '@/views/couriers/';

defineProps<{
  isOpen: boolean;
  courierData: Courier | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
