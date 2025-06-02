<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">
            Información del gasto
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldForm label="Nombre" name="name" id="name" required />
            <FieldForm label="Fecha" name="date" id="date" type="date" required />
          </div>
          <FieldForm
            label="Descripción"
            name="description"
            id="description"
            type="textarea"
            required
          />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectForm
              label="Método de Pago"
              name="method"
              id="method"
              :options="{ ...paymentMethods }"
              required
            />
            <FieldForm label="Monto" name="amount" id="amount" type="number" step="0.01" required />
          </div>
          <div class="flex justify-end space-x-2">
            <CancelButton @click="router.back()" />
            <AcceptButton :disabled="!meta.valid" />
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import { SideBar, Card, FieldForm, SelectForm, AcceptButton, CancelButton } from '@/components';
import { CompanyBill } from '@/views/company-bills/domain/CompanyBill';
import { PaymentMethodOptions } from '@/views/company-bills/domain/enums/PaymentMethod';
import { CompanyBillSchema } from '@/views/company-bills/schemas/CompanyBill.Schema';
import {
  GetCompanyBillByIdUseCase,
  CreateCompanyBillUseCase,
  UpdateCompanyBillUseCase,
} from '@/views/company-bills/use-cases/';
import { CompanyBillRepositoryImpl } from '@/views/company-bills/infrastructure/CompanyBill.RepositoryImpl';
import { CompanyBillFormAdapter } from '@/views/company-bills/adapters/';
import { AppRoutesCompanyBill } from '@/views/company-bills/presentation/routes/';

const router = useRouter();
const route = useRoute();
const billId = route.params.id as string;

const repository = new CompanyBillRepositoryImpl();
const getCompanyBillById = new GetCompanyBillByIdUseCase(repository);
const createCompanyBillUseCase = new CreateCompanyBillUseCase(repository);
const updateCompanyBillUseCase = new UpdateCompanyBillUseCase(repository);

const paymentMethods = ref(PaymentMethodOptions);

const { initializeForm, onSubmit, meta } = useVeeForm<CompanyBill>({
  id: billId,
  getById: async (id) => {
    const bill = await getCompanyBillById.execute(id);
    if (!bill) throw new Error('Factura no encontrada');
    return bill;
  },
  create: (formValues) => {
    const bill = CompanyBillFormAdapter.fromForm(formValues);
    return createCompanyBillUseCase.execute(bill);
  },
  update: (formValues, id) => {
    const bill = CompanyBillFormAdapter.fromForm({ ...formValues, id });
    return updateCompanyBillUseCase.execute(id, bill);
  },
  defaultRoute: AppRoutesCompanyBill.list,
  messages: {
    createError: 'Error al crear la factura',
    updateError: 'Error al actualizar la factura',
    createSuccess: 'Factura creada correctamente',
    updateSuccess: 'Factura actualizada correctamente',
  },
  validation: {
    schema: CompanyBillSchema,
    initialValues: {},
  },
});

onMounted(initializeForm);
</script>
