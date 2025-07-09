<template>
  <ModalForm title="Añadir Nuevo Cliente" :meta="meta" :isOpen="isOpen" @onSubmit="onSubmitform" @close="$emit('close')">
    <div class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Información del cliente</h3>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 space-x-4">
        <FieldForm label="Nombre Legal" name="legal_name" id="legal_name" required />
        <SelectForm label="Tipo de cliente" name="type" id="type" :items="Array.from(ClientTypeOptions)" required />
        <FieldForm label="Numero de registro" name="registration_number" id="registration_number" required />
      </div>
      <TextAreaForm label="Notas" name="notes" id="notes" row="12" />
    </div>
    <div v-for="(field, idx) in addressFields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Dirección de recogida</h3>
      </div>
      <FieldForm :name="`addresses[${idx}].address`" label="Direccion" :id="`address-${idx}`" required />
    </div>
    <div v-for="(field, idx) in phoneFields" :key="'phone-' + idx" class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Teléfonos de contacto</h3>
      </div>
      <FieldForm :name="`phones[${idx}].phone`" :id="`phones-number-${idx}`" label="Número de teléfono" required />
    </div>
  </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useFieldArray } from 'vee-validate';
import { useVeeForm } from '@/composables/';
import { FieldForm, ModalForm, SelectForm, TextAreaForm } from '@/components/';
import { ClientTypeOptions, createClient, DEFAULT_CLIENT, FormClient, FormClientAddress, FormClientPhone } from '@/views/clients/';
import { BasicClientSchema } from '@views/deliveries/schema/Delivery.ClientBasicSchema';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'addClient', clientData: FormClient): void;
}>();

const { initializeForm, onSubmit, meta } = useVeeForm<FormClient>({
  modal: true,
  create: createClient,
  messages: {
    createError: 'Error al crear el cliente',
    createSuccess: 'Cliente creado correctamente',
  },
  validation: {
    schema: BasicClientSchema,
    initialValues: { ...DEFAULT_CLIENT },
  },
});

onMounted(() => {
  initializeForm();
});

async function onSubmitform() {
  const createdClient = await onSubmit();

  if (createdClient) {
    emit('close');
    emit('addClient', createdClient);
  }
}

const { fields: addressFields } = useFieldArray<FormClientAddress>('addresses');
const { fields: phoneFields } = useFieldArray<FormClientPhone>('phones');
</script>
