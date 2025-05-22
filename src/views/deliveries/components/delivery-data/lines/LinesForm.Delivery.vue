<template>
   <Sheet title="Productos">
      <PlusButton @click="push(DELIVERY_LINE_DEFAULT_FORM_VALUE)" />
      <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
         <Text>No hay Productos agregadas</Text>
      </div>
      <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 pb-6 border-b last:border-b-0 dark:border-gray-700">
         <div v-if="fields.length > 1" class="flex justify-between items-center">
            <h3 class="font-medium text-gray-900 dark:text-white">Producto {{ idx + 1 }}</h3>
            <TrashButton @click="() => remove(idx)" />
         </div>
         <FieldForm label="descripción" :name="`lines[${idx}].description`" :id="`lines-${idx}`" />
         <div class="grid grid-cols-2 gap-4">
            <FieldForm type="number" label="Cantidad" :name="`lines[${idx}].quantity`" :id="`lines-${idx}`" />
            <FieldForm type="number" label="Precio Unitario" :name="`lines[${idx}].unitPrice`" :id="`lines-${idx}`" />
         </div>
         <FieldFormDisabled label="Total" :id="`lines-${idx}`" v-model="field.value.total" />
      </div>
   </Sheet>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useFieldArray } from "vee-validate";
import { DeliveryLine, DELIVERY_LINE_DEFAULT_FORM_VALUE } from "@/views/deliveries/";
import { PlusButton, TrashButton, Sheet, FieldForm, FieldFormDisabled, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<DeliveryLine>("lines");

const calculateTotal = (field: DeliveryLine) => {
   return +(field.quantity * field.unitPrice).toFixed(2);
};

watch(
   () => fields.value,
   (fields) => {
      fields.map((field) => (field.value.total = calculateTotal(field.value)));
   },
   { deep: true }
);
</script>
