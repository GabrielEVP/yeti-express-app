<template>
   <Sheet title="Lineas">
      <PlusButton @click="push(LINEDEFAULTFORMVALUE)" />
      <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
         <Text>No hay lineas agregadas</Text>
      </div>
      <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 pb-6 border-b last:border-b-0 dark:border-gray-700">
         <div v-if="fields.length > 1" class="flex justify-between items-center">
            <h3 class="font-medium text-gray-900 dark:text-white">Línea {{ idx + 1 }}</h3>
            <TrashButton @click="() => remove(idx)" />
         </div>
         <FieldForm label="descripción" :name="`lines[${idx}].description`" :id="`lines-${idx}`" />
         <div class="grid grid-cols-2 gap-4">
            <FieldForm type="number" label="Cantidad" :name="`lines[${idx}].quantity`" :id="`lines-${idx}`" />
            <FieldForm type="number" label="Precio Unitario" :name="`lines[${idx}].unitPrice`" :id="`lines-${idx}`" />
         </div>
         <div class="grid grid-cols-2 gap-4">
            <FieldForm type="number" :name="`lines[${idx}].taxRate`" label="Tasa IVA (%)" :id="`lines-${idx}`" />
            <FieldFormDisabled label="Total con IVA" :id="`lines-${idx}`" v-model="field.value.totalAmount" />
         </div>
         <FieldFormDisabled label="Total con IVA" :id="`lines-${idx}`" v-model="field.value.totalTaxAmount" />
      </div>
   </Sheet>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useFieldArray } from "vee-validate";
import { Line } from "@/models/";
import { LINEDEFAULTFORMVALUE } from "@/constants/";
import { PlusButton, TrashButton, Sheet, FieldForm, FieldFormDisabled, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<Line>("lines");

const calculateTotal = (field: any) => {
   return +(field.quantity * field.unitPrice).toFixed(2);
};

const calculateTaxTotal = (field: any) => {
   return +(field.quantity * field.unitPrice * (1 + field.taxRate / 100)).toFixed(2);
};

watch(
   () => fields.value,
   (fields) => {
      fields.map((field) => ((field.value.totalAmount = calculateTotal(field.value)), (field.value.totalTaxAmount = calculateTaxTotal(field.value))));
   },
   { deep: true }
);
</script>
