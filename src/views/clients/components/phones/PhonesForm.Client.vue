<template>
  <div class="flex justify-end mb-4">
    <PlusButton @click="push({ id: '', phone: '' })" />
  </div>
  <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
    <Text>No hay telefonos agregados</Text>
  </div>
  <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold dark:text-white">Telefonos {{ idx + 1 }}</h3>
      <TrashButton type="button" @click="remove(idx)" />
    </div>
    <FieldForm label="Telefono" :name="`phones[${idx}].phone`" :id="`phone-${idx}`" />
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { PlusButton, TrashButton, FieldForm, Text } from '@/components/';
import type { ClientPhone } from '@/views/clients/';

const { remove, push, fields } = useFieldArray<ClientPhone>('phones');
</script>
