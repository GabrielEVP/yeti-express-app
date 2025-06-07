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
        <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Pago Completo</h3>
      </div>

      <form @submit.prevent="onSubmitform" class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="space-y-4 mb-6">
          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div class="text-sm text-gray-500 dark:text-gray-400 mb-1">ID de Entrega</div>
            <div class="font-mono text-sm font-medium text-gray-900 dark:text-gray-100">
              {{ delivery?.getId() }}
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-gray-500 dark:text-gray-400 mb-1">Monto Total</div>
              <div class="font-medium text-gray-900 dark:text-gray-100">
                {{ delivery?.getService().getAmount() }}
              </div>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-gray-500 dark:text-gray-400 mb-1">Pendiente</div>
              <div class="font-medium text-amber-600 dark:text-amber-400">
                {{ delivery?.getService().getAmount() }}
              </div>
            </div>
          </div>

          <div
            class="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
          >
            <div class="text-sm text-emerald-700 dark:text-emerald-400 mb-1">Cantidad a Pagar</div>
            <div class="text-lg font-medium text-emerald-900 dark:text-emerald-300">
              {{ delivery?.getService().getAmount() }}
            </div>
          </div>

          <div class="mb-8">
            <label class="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-3"
              >Método de Pago</label
            >
            <div class="space-y-3">
              <label
                class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <input type="radio" name="payment_method" value="card" class="mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100">💳 Tarjeta</span>
              </label>
              <label
                class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <input type="radio" name="payment_method" value="transfer" class="mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >🏦 Transferencia</span
                >
              </label>
              <label
                class="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <input type="radio" name="payment_method" value="cash" class="mr-3" />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-100"
                  >💵 Efectivo</span
                >
              </label>
            </div>
          </div>
        </div>

        <div class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              class="flex-1 py-2 px-4 text-sm font-medium text-white bg-gray-900 dark:bg-gray-100 dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              Confirmar Pago Completo
            </button>
            <button
              type="button"
              @click="emitClose"
              class="flex-1 py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useVeeForm } from '@/composables/';
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
