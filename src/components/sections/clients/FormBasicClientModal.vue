<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <ModalForm :isOpen="isOpen" title="Añadir Nuevo Cliente" @close="$emit('close')" @onSubmit="onSubmit">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
         <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
         <FieldForm label="Numero de registro" name="registrationNumber" id="registrationNumber" required />
      </div>
      <div v-for="(field, idx) in fields" :key="idx">
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
import { defineProps } from "vue";
import { useForm, useFieldArray } from "vee-validate";
import { useAlert } from "@/composables/";
import { ClientAddress, Client, BasicClientSchema, DEFAULTBASICCLIENTFORMVALUE, postClients, adaptClient } from "@/views/clients/";
import { ModalForm, FieldForm, SuccessAlert } from "@/components/";

defineProps<{
   isOpen: boolean;
}>();

const emit = defineEmits<{
   (e: "close"): void;
   (e: "addClient", clientData: any): void;
}>();

const { handleSubmit } = useForm<Client>({
   validationSchema: BasicClientSchema,
   initialValues: { ...DEFAULTBASICCLIENTFORMVALUE },
});

const { fields } = useFieldArray<ClientAddress>("addresses");

const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
   let response: any;
   response = await postClients(values);

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError("Error al crear el cliente");
   } else {
      emit("addClient", adaptClient(response.data) as Client);
      triggerSuccess("Cliente guardado exitosamente");
   }
});
</script>
