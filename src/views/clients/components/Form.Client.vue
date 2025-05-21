<template>
   <SideBar>
      <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
         <Card class="w-full max-w-4xl p-6">
            <form @submit.prevent="onSubmit" class="h-full space-y-6">
               <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
                  <template #mobile>
                     <template v-for="tab in CLIENTTABS" :key="tab.value">
                        <option :value="tab.value">{{ tab.label }}</option>
                     </template>
                  </template>
                  <template #desktop>
                     <TabsTitle v-for="tab in CLIENTTABS" :key="tab.value" :tab="tab.value" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <component :is="tab.icon" class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">{{ tab.label }}</span>
                     </TabsTitle>
                  </template>
               </Tabs>
               <TabsContent tab="general" :activeTab="activeTab">
                  <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
                  <FieldForm label="Número de Registro" name="registrationNumber" id="registrationNumber" required />
               </TabsContent>
               <TabsContent tab="address" :activeTab="activeTab">
                  <AdressesForm />
               </TabsContent>
               <TabsContent tab="contact" :activeTab="activeTab">
                  <PhonesForm />
                  <EmailsForm />
               </TabsContent>
               <TabsContent tab="notes" :activeTab="activeTab">
                  <TextAreaForm label="Notas" name="notes" id="notes" />
               </TabsContent>
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
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useVeeForm } from "@/composables/";
import { SideBar, Card, Tabs, TabsContent, TabsTitle, FieldForm, TextAreaForm, AcceptButton, CancelButton } from "@/components/";
import { Client, ClientSchema, DEFAULTCLIENTFORMVALUE, clientAppRoutes, getClient, putClients, postClients, CLIENTTABS, AdressesForm, EmailsForm, PhonesForm } from "@/views/clients/";

const activeTab = ref("general");
const router = useRouter();

const route = useRoute();
const clientId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Client, string>({
   id: clientId,
   getById: getClient,
   create: postClients,
   update: (values, id) => putClients(values, id),
   defaultRoute: clientAppRoutes.list,
   messages: {
      createError: "Error al crear el cliente",
      updateError: "Error al actualizar el cliente",
      createSuccess: "Cliente creado correctamente",
      updateSuccess: "Cliente actualizado correctamente",
   },
   validation: {
      schema: ClientSchema,
      initialValues: { ...DEFAULTCLIENTFORMVALUE },
   },
});

onMounted(initializeForm);
</script>
