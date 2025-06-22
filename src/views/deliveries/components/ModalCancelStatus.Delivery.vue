<template>
  <ModalForm title="Cancelar Orden" :meta="meta" :isOpen="isOpen" @onSubmit="onSubmitform" @close="$emit('close')">
    <TextAreaForm label="Motivo de cancelacion" name="cancellation_notes" id="notes"  />
  </ModalForm>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useForm } from 'vee-validate';
import { useAlert } from '@/composables/useAlert';
import { ModalForm, TextAreaForm } from '@/components/';
import { object, string } from 'yup';
import { CancelDelivery } from '@/views/deliveries/';

const CancelationDeliverySchema = object({
  cancellation_notes: string().required('El motivo de la cancelacion es requerido'),
});

const props = defineProps<{
  isOpen: boolean;
  deliveryId: string;
}>();

interface CancellationData {
  cancellationNotes: string;
  deliveryId: string;
}

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'cancelDelivery', data: CancellationData): void;
}>();

const { triggerError, triggerSuccess } = useAlert();

const { handleSubmit, meta } = useForm({
  validationSchema: CancelationDeliverySchema,
  initialValues: {
    cancellation_notes: '',
  }
});

async function onSubmitform() {
  await handleSubmit(async (formValues) => {
    try {
      await CancelDelivery(props.deliveryId, { cancellation_notes: formValues.cancellation_notes });

      triggerSuccess('Orden cancelada correctamente');

      const cancelData: CancellationData = {
        cancellationNotes: formValues.cancellation_notes,
        deliveryId: props.deliveryId
      };

      emit('cancelDelivery', cancelData);
      emit('close');
    } catch (error) {
      console.error(error);
      triggerError('Error al cancelar la orden');
    }
  })();
}
</script>
