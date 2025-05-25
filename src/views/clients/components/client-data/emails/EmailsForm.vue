<template>
  <div class="flex justify-end mb-4">
    <PlusButton @click="push(EMAILDEFAULTFORMVALUES)" />
  </div>
  <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
    <Text>No hay emails agregados</Text>
  </div>
  <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold dark:text-white">Emails {{ idx + 1 }}</h3>
      <TrashButton type="button" @click="remove(idx)" />
    </div>
    <FieldForm label="Email" :name="`emails[${idx}].email`" :id="`email-${idx}`" />
  </div>
</template>

<script setup lang="ts">
import { useFieldArray } from 'vee-validate';
import { ClientEmail, EMAILDEFAULTFORMVALUES } from '@/views/clients/';
import { PlusButton, TrashButton, FieldForm, SelectForm, Text } from '@/components/';

const { remove, push, fields } = useFieldArray<ClientEmail>('emails');
</script>
