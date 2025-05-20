<template>
   <form @submit.prevent="onSubmit" class="h-full space-y-6">
      {{ errors }}
      <FieldForm label="Nombre" name="firstName" id="firstName" required />
      <FieldForm label="Apellido" name="lastName" id="lastName" required />
      <FieldForm label="Teléfono" name="phone" id="phone" required />
      <FieldForm label="Comisión" name="commission" id="commission" type="number" required />
      <FieldForm label="Activo" name="active" id="active" type="checkbox" />
      <div class="flex justify-end space-x-2">
         <CancelButton @click="router.back()" />
         <AcceptButton :disabled="!meta.valid" />
      </div>
   </form>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { Courier, DealerSchema, DEFAULT_DEALER_FORM, getDealer, putDealer, postDealer } from "@/views/couriers/";
import { FieldForm, AcceptButton, CancelButton } from "@/components/";
import { useUserId } from "@/composables";

const router = useRouter();
const route = useRoute();
const dealerId = route.params.id as string;

const { userId } = useUserId();
const { initializeForm, onSubmit, meta, errors } = useForm<Courier, string>({
   id: dealerId,
   getById: getDealer,
   create: postDealer,
   update: (values, id) => putDealer(values, id),
   defaultRoute: "/couriers", // Corrected route
   messages: {
      createError: "Error al crear el courier",
      updateError: "Error al actualizar el courier",
      createSuccess: "Courier creado correctamente",
      updateSuccess: "Courier actualizado correctamente",
   },
   validation: {
      schema: DealerSchema, // Use DealerSchema
      initialValues: { ...DEFAULT_DEALER_FORM, userId: userId.value }, // Use DEFAULT_DEALER_FORM
   },
});

onMounted(initializeForm);
</script>
