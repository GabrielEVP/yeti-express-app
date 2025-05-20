<template>
   <SideBar>
      <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="space-y-6">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del empleado</h2>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <FieldForm label="Nombre" name="name" id="name" required />
                  <SelectForm label="Rol" name="role" :items="[...ROLE_SELECT]" />
               </div>
               <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <FieldForm label="Email" name="email" id="email" required />
                  <FieldForm label="Contraseña" name="password" id="password" type="password" required />
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
import { SideBar, Card, FieldForm, SelectForm, AcceptButton, CancelButton } from "@/components/";
import { Employer, EmployerSchema, DEFAULT_EMPLOYER_FORM, getEmployer, putEmployer, postEmployer, ROLE_SELECT } from "@/views/employees";

const router = useRouter();
const route = useRoute();
const employerId = route.params.id as string;

const { userId } = useUserId();

const { initializeForm, onSubmit, meta } = useVeeForm<Employer>({
   id: employerId,
   getById: getEmployer,
   create: postEmployer,
   update: (values, id) => putEmployer(values, id),
   defaultRoute: "/employers",
   messages: {
      createError: "Error al crear el Empleador",
      updateError: "Error al actualizar el Empleador",
      createSuccess: "Empleador creado correctamente",
      updateSuccess: "Empleador actualizado correctamente",
   },
   validation: {
      schema: EmployerSchema,
      initialValues: { ...DEFAULT_EMPLOYER_FORM, userId: userId.value },
   },
});

onMounted(initializeForm);
</script>
