<template>
   <div class="flex justify-end mb-4">
      <PlusButton @click="push(DELIVERY_PAYMENT_DEFAULT_FORM_VALUE)" />
   </div>
   <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
      <Text>No hay pagos agregados</Text>
   </div>
   <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
         <h3 className="text-lg font-semibold dark:text-white">Pagos {{ idx + 1 }}</h3>
         <TrashButton type="button" @click="remove(idx)" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
         <FieldForm label="Fecha" type="date" :name="`payments[${idx}].date`" :id="`payments-${idx}`" />
         <FieldForm label="Monto" type="number" :name="`payments[${idx}].amount`" :id="`payments-${idx}`" />
         <SelectForm label="Tipo de Pago" v-model="field.value.typePaymentId" :items="[...typePayments]" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFieldArray } from "vee-validate";
import { DeliveryPayment, DELIVERY_PAYMENT_DEFAULT_FORM_VALUE } from "@views/deliveries";
import { PlusButton, TrashButton, FieldForm, SelectForm, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<DeliveryPayment>("payments");

const typePayments = ref<{ label: string; value: string }[]>([]);
</script>
