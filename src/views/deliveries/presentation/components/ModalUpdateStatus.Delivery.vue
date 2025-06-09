<template>
  <ConfirmationActionModal
    :isOpen="isOpen"
    :message="getStatusMessage"
    @confirm="handleConfirm"
    @cancel="close"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ConfirmationActionModal } from '@/components/';
import { DeliveryStatus } from '@/views/deliveries/domain/enum';

const props = defineProps<{
  isOpen: boolean;
  status?: DeliveryStatus;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const getStatusMessage = computed(() => {
  switch (props.status) {
    case DeliveryStatus.IN_TRANSIT:
      return '¿Estás seguro que quieres marcar esta orden como En Tránsito?';
    case DeliveryStatus.DELIVERED:
      return '¿Estás seguro que quieres marcar esta orden como Entregada?';
    case DeliveryStatus.REFUSED:
      return '¿Estás seguro que quieres marcar esta orden como Rechazada?';
    default:
      return '¿Estás seguro que quieres actualizar el estado de esta orden?';
  }
});

const handleConfirm = () => {
  emit('confirm');
};

const close = () => {
  emit('cancel');
};
</script>
