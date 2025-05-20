<template>
   <SideBar>
      <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="space-y-6">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del Repartidor</h2>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <FieldForm label="Nombre" name="firstName" id="firstName" required />
                  <FieldForm label="Apellido" name="lastName" id="lastName" required />
               </div>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <FieldForm label="Teléfono" name="phone" id="phone" required />
                  <FieldForm label="Comisión" name="commission" id="commission" type="number" required />
               </div>
               <div class="flex justify-end space-x-2">
                  <CancelButton @click="router.back()" />
                  <AcceptButton :disabled="!meta.valid" />
               </div>
            </form>
         </Card>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserId, useVeeForm } from "@/composables";
import { SideBar, Card, FieldForm, AcceptButton, CancelButton } from "@/components/";
import { Courier, CourierSchema, DEFAULT_COURIER_FORM, getCourier, putCourier, postCourier } from "@/views/couriers/";

const router = useRouter();
const route = useRoute();
const courierId = route.params.id as string;

const { userId } = useUserId();

const { initializeForm, onSubmit, meta } = useVeeForm<Courier>({
   id: courierId,
   getById: getCourier,
   create: postCourier,
   update: (values, id) => putCourier(values, id),
   defaultRoute: "/couriers",
   messages: {
      createError: "Error al crear el repartidor",
      updateError: "Error al actualizar el repartidor",
      createSuccess: "Repartidor creado correctamente",
      updateSuccess: "Repartidor actualizado correctamente",
   },
   validation: {
      schema: CourierSchema,
      initialValues: { ...DEFAULT_COURIER_FORM, userId: userId.value },
   },
});

onMounted(initializeForm);
</script>
