<template>
  <ModalForm
    title="Añadir Pago"
    :meta="meta"
    :isOpen="isOpen"
    @onSubmit="onSubmitform"
    @close="$emit('close')"
  >
    <div class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Agregar Pago</h3>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 space-x-4">
        <SelectForm
          label="Método de pago"
          name="method"
          id="method"
          :items="Array.from(PaymentMethodOptions)"
          required
        />
        <FieldForm label="Monto" name="amount" id="amount" type="number" required />
        <FieldForm label="Fecha" name="date" id="date" type="date" required />
      </div>
    </div>
  </ModalForm>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useVeeForm } from '@/composables/';
import { ModalForm, FieldForm, SelectForm } from '@/components/';
import { DebtPayment, PaymentMethodOptions } from '@/views/debts/domain/';
import { DebtPaymentSchema } from '@/views/debts/schema/';
import { AddDebtPaymentUseCase } from '@/views/debts/use-cases/';
import { DebtRepositoryImpl } from '@/views/debts/infrastructure/Debt.RepositoryImpl';
import { DebtPaymentFormAdapter } from '@/views/debts/adapter/form/';

defineProps<{
  isOpen: boolean;
  debtId: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'paymentAdded', payment: DebtPayment): void;
}>();
const repository = new DebtRepositoryImpl();
const addDebtPaymentUseCase = new AddDebtPaymentUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<DebtPayment>({
  modal: true,
  create: (formValues) => {
    const payment = DebtPaymentFormAdapter.fromForm(formValues);
    return addDebtPaymentUseCase.execute(props.debtId, payment);
  },
  messages: {
    createError: 'Error al añadir el pago',
    createSuccess: 'Pago añadido correctamente',
  },
  validation: {
    schema: DebtPaymentSchema,
    initialValues: {
      date: new Date().toISOString().split('T')[0]
    },
  },
});

const props = defineProps<{
  isOpen: boolean;
  debtId: string;
}>();

onMounted(() => {
  initializeForm();
});

async function onSubmitform() {
  const updatedDebt = await onSubmit();

  if (updatedDebt) {
    emit('close');
    emit('paymentAdded', updatedDebt.getPayments()[updatedDebt.getPayments().length - 1]);
  }
}
</script>
