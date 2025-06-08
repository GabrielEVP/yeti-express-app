<template>
  <div
    v-show="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
    @click.self="emitClose"
  >
    <div
      class="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] rounded-lg shadow-xl flex flex-col"
    >
      <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Pago Parcial</h3>
      </div>
      <form @submit.prevent="onSubmitform">
        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
          <div class="space-y-4 mb-6">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Text>Numero de orden</Text>
              <Text>
                {{ delivery?.getNumber() }}
              </Text>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Text>Monto Total</Text>
                <Text>
                  {{ delivery.getDebts().getAmount() }}
                </Text>
              </div>
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Text>Pendiente</Text>
                <Text>
                  {{ delivery.getDebts().getRemainingAmount() }}
                </Text>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <FieldForm
              label="Monto"
              type="number"
              name="amount"
              :max="String(delivery.getDebts().getRemainingAmount())"
              :placeholder="String(delivery.getDebts().getRemainingAmount())"
            />
          </div>
          <div class="mb-4">
            <Label>Forma de Pago</Label>
            <div class="mt-4">
              <div v-for="field in PaymentMethodOptions" :key="field.value" class="mt-8">
                <FieldRadio name="method" :id="field.value" :value="field.value">
                  {{ field.label }}
                </FieldRadio>
              </div>
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
import { Label, Text, CancelButton, AcceptButton, FieldForm } from '@/components/';
import { Delivery } from '@/views/deliveries';
import { DebtPayment, PaymentMethodOptions } from '@views/debts-payments/domain';
import { DebtPaymentSchema } from '@views/debts-payments/schema';
import { CreateDebtPaymentUseCase } from '@/views/debts-payments/';
import { DebtPaymentRepositoryImpl } from '@/views/debts-payments/';
import { DebtPaymentFormAdapter } from '@views/debts-payments/';
import FieldRadio from '@components/forms/FieldRadio.vue';

defineProps<{
  isOpen: boolean;
  delivery: Delivery;
}>();

const repository = new DebtPaymentRepositoryImpl();
const createDebtPaymentUseCase = new CreateDebtPaymentUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<DebtPayment>({
  modal: true,
  create: (formValues) => {
    const payment = DebtPaymentFormAdapter.fromFormPartialPayment(formValues);
    return createDebtPaymentUseCase.execute(payment);
  },
  messages: {
    createError: 'Error al crear el pago',
    createSuccess: 'Pago creado correctamente',
  },
  validation: {
    schema: DebtPaymentSchema,
    initialValues: {},
  },
});

onMounted(() => {
  initializeForm();
});

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
  (e: 'select', delivery: Delivery): void;
}>();

const emitClose = () => {
  emit('update:isOpen', false);
};

async function onSubmitform() {
  const createdPaid = await onSubmit();

  if (createdPaid) {
    emitClose();
  }
}
</script>
