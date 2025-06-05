<template>
  <ModalForm
    title="Añadir Pago"
    :meta="meta"
    :isOpen="isOpen"
    @onSubmit="onSubmitform"
    @close="$emit('close')"
  >
    <div class="space-y-4 p-4 rounded-md mb-4">
      <SelectForm
        label="Método de pago"
        name="method"
        id="method"
        placeholder="Selecciona una forma de pago"
        :items="Array.from(PaymentMethodOptions)"
        required
      />
    </div>
  </ModalForm>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useVeeForm } from '@/composables/';
import { ModalForm, SelectForm } from '@/components/';
import { DebtPayment, PaymentMethodOptions } from '@/views/debts-payments/domain/';
import { DebtPaymentSchema } from '@/views/debts-payments/schema/';
import { CreateDebtPaymentUseCase } from '@/views/debts-payments/';
import { DebtPaymentRepositoryImpl } from '@/views/debts-payments/infrastructure/';
import { DebtPaymentFormAdapter } from '@/views/debts-payments/adapter/form/';

const props = defineProps<{
  isOpen: boolean;
  debtId: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'paymentAdded', payment: DebtPayment): void;
}>();

const repository = new DebtPaymentRepositoryImpl();
const createDebtPaymentUseCase = new CreateDebtPaymentUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<DebtPayment>({
  modal: true,
  create: (formValues) => {
    const payment = DebtPaymentFormAdapter.fromForm(formValues);
    return createDebtPaymentUseCase.execute(payment);
  },
  messages: {
    createError: 'Error al añadir el pago',
    createSuccess: 'Pago añadido correctamente',
  },
  validation: {
    schema: DebtPaymentSchema,
    initialValues: {},
  },
});

onMounted(() => {
  initializeForm();
});

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      initializeForm();
    }
  }
);

async function onSubmitform() {
  const updatedDebt = await onSubmit();

  if (updatedDebt) {
    emit('close');
    emit('paymentAdded', updatedDebt.getPayments()[updatedDebt.getPayments().length - 1]);
  }
}
</script>
