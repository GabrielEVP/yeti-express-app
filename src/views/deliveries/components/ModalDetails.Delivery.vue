<template>
  <ModalDetail v-if="deliveryData" :is-open="isOpen" @close="handleCloseModal">
    <div class="relative overflow-hidden">
      <ModalTitleModal>Detalle de la Entrega</ModalTitleModal>
      <div class="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div class="text-center py-4 sm:py-6 relative">
          <div class="relative">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">Número de Seguimiento</p>
            <div class="relative inline-block">
              <p class="text-3xl sm:text-4xl font-black text-black dark:text-white">
                {{ deliveryData.number }}
              </p>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="space-y-4 sm:space-y-5">
            <ModalContentItem>
              <template #title>Estado</template>
              <template #content>
                <Bagde>{{ getDeliveryStatusLabel(deliveryData.status) }}</Bagde>
              </template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Estado de pago</template>
              <template #content>
                <Bagde>{{ getDeliveryPaymentStatusLabel(deliveryData.payment_status) }}</Bagde>
              </template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Tipo de pago</template>
              <template #content>
                <Bagde>{{ getPaymentTypeLabel(deliveryData.payment_type) }}</Bagde>
              </template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Servicio</template>
              <template #content>{{ deliveryData.service_name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Cliente</template>
              <template #content>{{ deliveryData.client_legal_name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Repartidor</template>
              <template #content>{{ deliveryData.courier_full_name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Monto</template>
              <template #content>{{ formatToDollars(deliveryData.amount) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Entrega</template>
              <template #content>
                {{ formatDateCustom(deliveryData.date) }}
              </template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Actualización</template>
              <template #content>{{ formatDateCustom(deliveryData.updated_at) }}</template>
            </ModalContentItem>
          </div>
        </div>
        <div
          v-if="deliveryData.pickup_address"
          class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <PackageCheck class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Direccion de Recogida</span>
          </div>
          <div class="space-y-4 sm:space-y-5">
            <ModalContentItem>
              <template #title>Direccion</template>
              <template #content>{{ deliveryData.pickup_address }}</template>
            </ModalContentItem>
          </div>
        </div>
        <div
          v-if="deliveryData.receipt_full_name"
          class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <ClipboardCheck class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Direccion de entrega</span>
          </div>
          <div class="space-y-4 sm:space-y-5">
            <ModalContentItem>
              <template #title>Nombre Completo</template>
              <template #content>{{ deliveryData.receipt_full_name }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Teléfono</template>
              <template #content>{{ deliveryData.receipt_phone }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Dirección</template>
              <template #content>{{ deliveryData.receipt_address }}</template>
            </ModalContentItem>
          </div>
        </div>
        <ModalSpecialContentItem v-if="deliveryData.notes">
          <template #title>Notas</template>
          <template #content>{{ deliveryData.notes }}</template>
        </ModalSpecialContentItem>
        <ModalSpecialContentItem v-if="deliveryData.cancellation_notes">
          <template #title>Nota de cancelacion</template>
          <template #content>{{ deliveryData.cancellation_notes }}</template>
        </ModalSpecialContentItem>
      </div>
    </div>
  </ModalDetail>
</template>

<script setup lang="ts">
import { formatDateCustom, formatToDollars } from '@/utils/';
import { Bagde, ModalContentItem, ModalDetail, ModalSpecialContentItem, ModalTitleModal } from '@/components/';
import { ClipboardCheck, PackageCheck } from 'lucide-vue-next';
import { DetailDelivery, getDeliveryPaymentStatusLabel, getDeliveryStatusLabel, getPaymentTypeLabel } from '@views/deliveries/models';

defineProps<{
  isOpen: boolean;
  deliveryData: DetailDelivery | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
