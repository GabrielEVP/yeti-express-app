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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldForm label="Telefono" :name="`phones[${idx}].phone`" :id="`phone-${idx}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { ClientPhone, PHONEDEFAULTFORMVALUE } from '@/views/clients/';
import { PlusButton, TrashButton, FieldForm, Text } from '@/components/';

const { remove, push, fields } = useFieldArray<ClientPhone>('phones');
</script>
