<template>
   <div class="flex justify-end mb-4">
      <PlusButton @click="push(BANKACCCOUNTDEFAULTFORMVALUE)" />
   </div>
   <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
      <Text>No hay cuentas bancarias agregadas</Text>
   </div>
   <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div className="flex justify-between items-center">
         <h3 className="text-lg font-semibold dark:text-white">Cuentas bancarias {{ idx + 1 }}</h3>
         <TrashButton type="button" @click="remove(idx)" />
      </div>
      <FieldForm label="Nombre del banco" :name="`bankAccounts[${idx}].name`" :id="`bankAccounts-${idx}`" />
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
         <FieldForm label="Cuenta Bancaria" :name="`bankAccounts[${idx}].accountNumber`" :id="`bankAccounts-${idx}`" />
         <SelectForm label="Tipo" v-model="field.value.type" :items="[...BANKACCOUNTSELECT]" />
      </div>
   </div>
</template>

<script setup lang="ts">
import { useFieldArray } from "vee-validate";
import { BankAccount } from "@/models/";
import { BANKACCOUNTSELECT, BANKACCCOUNTDEFAULTFORMVALUE } from "@/constants/";
import { PlusButton, TrashButton, FieldForm, SelectForm, Text } from "@/components/";

const { remove, push, fields } = useFieldArray<BankAccount>("bankAccounts");
</script>
