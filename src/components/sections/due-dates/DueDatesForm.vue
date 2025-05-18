<template>
   <div class="flex justify-end mb-4">
      <PlusButton @click="push(DUEDATEDEFAULTFORMVALUE)" />
   </div>
   <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
      <Text>No hay vencimientos agregados</Text>
   </div>
   <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
         <h3 className="text-lg font-semibold dark:text-white">Vencimientos {{ idx + 1 }}</h3>
         <TrashButton @click="remove(idx)" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
         <FieldForm label="Fecha" type="date" :name="`dueDates[${idx}].date`" :id="`dueDates-${idx}`" />
         <FieldForm label="Monto" type="number" :name="`dueDates[${idx}].amount`" :id="`dueDates-${idx}`" />
         <SelectForm label="Estado" v-model="field.value.status" :items="[...STATUSBILLINGSELECT]" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";
import { DueDate } from "@/models/";
import { STATUSBILLINGSELECT, DUEDATEDEFAULTFORMVALUE } from "@/constants/";
import { PlusButton, TrashButton, FieldForm, SelectForm, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<DueDate>("dueDates");
</script>
