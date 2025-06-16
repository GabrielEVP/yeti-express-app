<template>
  <div>
    <div class="flex justify-end mb-4">
      <PlusButton type="button" @click="push({ id: '', address: '', canDelete: true })" />
    </div>
    <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
      <Text>No hay direcciones agregadas</Text>
    </div>
    <div v-for="(field, idx) in fields" :key="field.key" class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Dirección {{ idx + 1 }}</h3>
        <TrashButton v-if="field.value.canDelete" type="button" @click="remove(idx)" />
      </div>
      <FieldForm label="Dirección" :id="`address-${idx}`" :name="`addresses[${idx}].address`" :required="idx === 0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { PlusButton, TrashButton, FieldForm, Text } from '@/components/';
import type { ClientAddress } from '@/views/clients/';

const { fields, push, remove } = useFieldArray<ClientAddress>('addresses');
</script>
