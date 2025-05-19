<template>
   <div>
      <div class="flex justify-end mb-4">
         <PlusButton type="button" @click="push(ADDRESSDEFAULTFORMVALUE)" />
      </div>
      <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
         <Text>No hay direcciones agregadas</Text>
      </div>
      <div v-for="(field, idx) in fields" :key="field.key" class="space-y-4 border p-4 rounded-md mb-4">
         <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold dark:text-white">Dirección {{ idx + 1 }}</h3>
            <TrashButton type="button" @click="remove(idx)" />
         </div>
         <FieldForm :name="`addresses[${idx}].address`" :id="`address-${idx}`" label="Dirección" type="text" :required="idx === 0" />
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FieldForm :name="`addresses[${idx}].state`" :id="`state-${idx}`" label="Estado" type="text" :required="idx === 0" />
            <FieldForm :name="`addresses[${idx}].city`" :id="`city-${idx}`" label="Ciudad" type="text" :required="idx === 0" />
         </div>
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <FieldForm :name="`addresses[${idx}].municipality`" :id="`municipality-${idx}`" label="Municipio" type="text" :required="idx === 0" />
            <FieldForm :name="`addresses[${idx}].postalCode`" :id="`postalCode-${idx}`" label="Código Postal" type="text" :required="idx === 0" />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";
import { Address } from "@/models/";
import { ADDRESSDEFAULTFORMVALUE } from "@/constants/";
import { PlusButton, TrashButton, FieldForm, Text } from "@/components/";

const { fields, push, remove } = useFieldArray<Address>("addresses");
</script>
