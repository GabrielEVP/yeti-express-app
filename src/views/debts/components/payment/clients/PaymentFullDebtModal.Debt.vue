<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
    @click.self="emitClose"
  >
    <div class="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] rounded-lg shadow-xl flex flex-col">
      <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Pago Completo de todas las deudas del cliente</h3>
      </div>
      <form @submit.prevent="onSubmitform" class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="space-y-4 mb-6">
          <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Text>Cantidad a Pagar</Text>
            <Text>
              {{ formatToDollars(stast?.total_pending ?? 0) }}
            </Text>
          </div>
          <div class="mb-8">
            <FieldHidden name="debtId" id="debtId" value="delivery.getDebts()?.getId()" />
            <Text>Forma de Pago</Text>
            <div v-for="field in PaymentMethodOptions" :key="field.value" class="mt-8">
              <FieldRadio name="method" :id="field.value" :value="field.value">
                {{ field.label }}
              </FieldRadio>
            </div>
          </div>
        </div>
        <div class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col justify-end sm:flex-row gap-3">
            <CancelButton @click="emitClose" />
            <AcceptButton :disabled="!meta?.valid" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useVeeForm } from '@/composables/';
import { formatToDollars } from '@utils';
import { Text, CancelButton, AcceptButton } from '@/components/';
import FieldRadio from '@components/forms/FieldRadio.vue';
import { PaymentMethodOptions } from '@views/debts/';
import { FullDebtPaymentSchema } from '@views/debts/';
import { payAllDebts } from '@views/debts/';
import FieldHidden from '@components/forms/FieldHidden.vue';
import { Stast } from '@views/clients';

const props = defineProps<{
  isOpen: boolean;
  stast: Stast | null;
  clientId: string;
}>();

const { initializeForm, onSubmit, meta } = useVeeForm<any>({
  modal: true,
  create: payAllDebts,
  messages: {
    createError: 'Error al realizar el pago',
    createSuccess: 'Pago creado correctamente',
  },
  validation: {
    schema: FullDebtPaymentSchema,
    initialValues: {
      clientId: props.clientId ?? '',
    },
  },
});

onMounted(() => {
  initializeForm();
});

const emit = defineEmits<{
  (e: 'process', value: boolean): void;
  (e: 'update:isOpen', value: boolean): void;
}>();

const emitClose = () => {
  emit('update:isOpen', false);
};

const emitProccess = () => {
  emit('process', true);
};

async function onSubmitform() {
  const createdPaid = await onSubmit();

  if (createdPaid) {
    emitProccess();
    emitClose();
  }
}
</script>
