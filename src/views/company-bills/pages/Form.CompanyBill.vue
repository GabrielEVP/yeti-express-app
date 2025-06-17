<template>
  <SideBar>
    <BackButton  />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl mx-auto p-6">
        <LoadingSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="space-y-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del gasto</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldForm label="Nombre" name="name" id="name" required />
            <FieldForm label="Fecha" name="date" id="date" type="date" required />
          </div>
          <TextAreaForm label="Descripción" name="description" id="description" type="textarea" required />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectForm
              label="Método de Pago"
              name="method"
              placeholder="Selecciona un metodo de pago"
              id="method"
              :items="[...PaymentMethodOptions]"
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
import { nextTick, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import {
  SideBar,
  Card,
  FieldForm,
  SelectForm,
  AcceptButton,
  CancelButton,
  TextAreaForm,
  LoadingSkeleton, BackButton,
} from '@/components';
import { CompanyBill } from '@/views/company-bills/';
import { PaymentMethodOptions } from '@views/company-bills/models/PaymentMethod';
import { CompanyBillSchema } from '@views/company-bills/schema/CompanyBill.Schema';
import { getCompanyBillById, createCompanyBill, updateCompanyBill } from '@/views/company-bills/services/';
import { AppRoutesCompanyBill } from '@/views/company-bills/router/';

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const billId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<CompanyBill>({
  id: billId,
  getById: getCompanyBillById,
  create: createCompanyBill,
  update: (values, id) => updateCompanyBill(values, id),
  defaultRoute: AppRoutesCompanyBill.list,
  messages: {
    createError: 'Error al crear el gasto',
    updateError: 'Error al actualizar el gasto',
    createSuccess: 'Gasto creado correctamente',
    updateSuccess: 'Gasto actualizado correctamente',
  },
  validation: {
    schema: CompanyBillSchema,
    initialValues: {},
  },
});

onMounted(async () => {
  await initializeForm();

  await nextTick();
  formReady.value = true;
});
</script>
