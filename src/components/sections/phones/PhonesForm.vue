<template>
   <div class="flex justify-end mb-4">
      <PlusButton @click="push(PHONEDEFAULTFORMVALUE)" />
   </div>
   <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
      <Text>No hay telefonos agregados</Text>
   </div>
   <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
         <h3 className="text-lg font-semibold dark:text-white">Telefonos {{ idx + 1 }}</h3>
         <TrashButton type="button" @click="remove(idx)" />
      </div>
      <FieldForm type="text" label="Nombre" :name="`phones[${idx}].name`" :id="`phone-${idx}`" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
         <FieldForm label="Telefono" :name="`phones[${idx}].phone`" :id="`phone-${idx}`" />
         <SelectForm label="Tipo" :name="`phones[${idx}].type`" v-model="field.value.type" :items="[...CONTACTSELECT]" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";
import { Phone } from "@models";
import { CONTACTSELECT, PHONEDEFAULTFORMVALUE } from "@/constants/";
import { PlusButton, TrashButton, FieldForm, SelectForm, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<Phone>("phones");
</script>
