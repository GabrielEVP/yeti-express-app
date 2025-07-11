<template>
  <div v-if="clientType === 'anonymous'" class="space-y-4 border p-4 rounded-md mb-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <FieldForm label="Nombre Legal" name="anonymous_client.legal_name" required />
      <SelectForm
        label="Tipo de cliente"
        name="anonymous_client.type"
        :items="Array.from(ClientTypeOptions)"
        placeholder="Seleccione un tipo de cliente"
        required
      />
      <FieldForm label="Numero de registro" name="anonymous_client.registration_number" required />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldForm label="Teléfono" name="anonymous_client.phone" />
      <FieldForm label="Dirección de recogida" name="pickup_address" required />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FieldForm, SelectForm } from '@components';
import { ClientTypeOptions } from '@views/clients';

defineProps<{
  clientType: 'regular' | 'anonymous';
}>();
</script>
