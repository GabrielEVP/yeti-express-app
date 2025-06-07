<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50"
    @click.self="emitClose"
  >
    <div
      class="bg-white dark:bg-gray-800 w-full max-w-md max-h-[90vh] rounded-lg shadow-xl flex flex-col"
    >
      <div class="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Pago Parcial</h3>
      </div>
      <form @onSubmit="onSubmitform">
        <div class="flex-1 overflow-y-auto p-4 sm:p-6">
          <div class="space-y-4 mb-6">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Text class="mb-1">Numero de Entrega</Text>
              <Text>
                {{ delivery?.getNumber() }}
              </Text>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Text class="mb-1">Monto Total</Text>
                <Text>
                  {{ delivery?.getService().getAmount() }}
                </Text>
              </div>
              <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Text>Pendiente</Text>
                <Text>
                  {{ delivery?.getService().getAmount() }}
                </Text>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <Label>Cantidad a Pagar</Label>
            <Input type="number" name="amount" :max="delivery?.getService().getAmount()" :placeholder="delivery?.getService().getAmount()" />
          </div>
          <div class="mb-4">
            <Label>Método de Pago</Label>
            <div class="space-y-3">
              <Label>
                <input
                  type="radio"
                  value="card"
                  class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">💳 Tarjeta</span>
              </Label>
              <Label>
                <input
                  type="radio"
                  value="transfer"
                  class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >🏦 Transferencia</span
                >
              </Label>
              <Label>
                <input
                  type="radio"
                  value="cash"
                  class="mr-3 text-gray-900 dark:text-gray-100 focus:ring-gray-900 dark:focus:ring-gray-400"
                />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >💵 Efectivo</span
                >
              </Label>
            </div>
          </div>
        </div>
        <div class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-3">
            <Button
              class="text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Confirmar Pago
            </Button :disabled="meta">
            <Button
              @click="emitClose"
              class="text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useVeeForm } from '@/composables/';
import { Input, Label, Text, Button } from '@/components/';
import { Delivery } from '@/views/deliveries';
import { DebtPayment } from '@views/debts-payments/domain';
import { DebtPaymentSchema } from '@views/debts-payments/schema';
import { CreateDebtPaymentUseCase } from '@/views/debts-payments/';
import { DebtPaymentRepositoryImpl } from '@/views/debts-payments/';
import { DebtPaymentFormAdapter } from '@views/debts-payments/';


defineProps<{
  isOpen: boolean;
  delivery: Delivery;
}>();

const repository = new DebtPaymentRepositoryImpl();
const createClientUseCase = new CreateDebtPaymentUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<DebtPayment>({
  modal: true,
  create: (formValues) => {
    const client = DebtPaymentFormAdapter.fromForm(formValues);
    return createClientUseCase.execute(client);
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
  (e: 'update:open', value: boolean): void;
  (e: 'select', delivery: Delivery): void;
}>();

const emitClose = () => {
  emit('update:open', false);
};

async function onSubmitform() {
  const createdPaid = await onSubmit();

  if (createdPaid) {
     emitClose();
  }
}
</script>
