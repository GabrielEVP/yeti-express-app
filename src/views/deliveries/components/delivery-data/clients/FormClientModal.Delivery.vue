<template>
   <ModalForm :isOpen="isOpen" title="Añadir Nuevo Cliente" @close="$emit('close')" :meta="meta" @onSubmit="onSubmit">
      <div class="space-y-4 border p-4 rounded-md mb-4">
         <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold dark:text-white">Información del cliente</h3>
         </div>
         <div class="grid grid-cols-1 lg:grid-cols-2 space-x-4">
            <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
            <FieldForm label="Numero de registro" name="registrationNumber" id="registrationNumber" required />
         </div>
      </div>
      <div v-for="(field, idx) in fields" :key="idx" class="space-y-4 border p-4 rounded-md mb-4">
         <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold dark:text-white">Dirección de recogida</h3>
         </div>
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FieldForm :name="`addresses[${idx}].address`" label="Direccion" :id="`address-${idx}`" required />
            <FieldForm :name="`addresses[${idx}].state`" label="Estado" :id="`address-${idx}`" required />
         </div>
         <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <FieldForm :name="`addresses[${idx}].city`" label="Ciudad" :id="`address-${idx}`" required />
            <FieldForm :name="`addresses[${idx}].municipality`" label="Municipio" :id="`address-${idx}`" required />
            <FieldForm :name="`addresses[${idx}].postalCode`" label="Codigo Postal" :id="`address-${idx}`" required />
         </div>
      </div>
   </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from "vue";
import { useFieldArray } from "vee-validate";
import { useUserId, useVeeForm } from "@/composables/";
import { ModalForm, FieldForm } from "@/components/";
import { Client, ClientAddress, BasicClientSchema, DEFAULTBASICCLIENTFORMVALUE, postClients } from "@/views/clients/";

defineProps<{
   isOpen: boolean;
}>();

defineEmits<{
   (e: "close"): void;
   (e: "addClient", clientData: Client): void;
}>();

const { userId } = useUserId();

const { initializeForm, onSubmit, meta } = useVeeForm<Client>({
   create: postClients,
   messages: {
      createError: "Error al crear el cliente",
      createSuccess: "Cliente creado correctamente",
   },
   validation: {
      schema: BasicClientSchema,
      initialValues: { ...DEFAULTBASICCLIENTFORMVALUE, userId: userId.value },
   },
});

onMounted(() => {
   initializeForm();
});

const { fields } = useFieldArray<ClientAddress>("addresses");
</script>
