<template>
   <SideBar>
      <div class="flex justify-center items-center min-h-screen">
         <Card class="w-full max-w-4xl p-6">
            <form @submit.prevent="onSubmit" class="h-full space-y-6">
               <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
                  <template #mobile>
                     <template v-for="tab in SUPPLIERTABS" :key="tab.value">
                        <option :value="tab.value">{{ tab.label }}</option>
                     </template>
                  </template>
                  <template #desktop>
                     <TabsTitle v-for="tab in SUPPLIERTABS" :key="tab.value" :tab="tab.value" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <component :is="tab.icon" class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">{{ tab.label }}</span>
                     </TabsTitle>
                  </template>
               </Tabs>

               <TabsContent tab="general" :activeTab="activeTab">
                  <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
                  <FieldForm label="Número de Registro" name="registrationNumber" id="registrationNumber" required />
                  <div class="grid grid-cols-1 lg:grid-cols-3 gap-2">
                     <FieldForm label="Sitio Web" name="website" id="website" />
                     <SelectForm label="Tipo de proveedor" name="type" :items="TYPECONTACTSELECT" id="type" />
                     <SelectForm label="País" name="country" :items="COUNTRIES" id="country" />
                  </div>
               </TabsContent>

               <TabsContent tab="address" :activeTab="activeTab">
                  <AdressesForm />
               </TabsContent>

               <TabsContent tab="contact" :activeTab="activeTab">
                  <PhonesForm />
                  <EmailsForm />
               </TabsContent>

               <TabsContent tab="bank" :activeTab="activeTab">
                  <BankAccountsForm />
               </TabsContent>

               <TabsContent tab="billing" :activeTab="activeTab">
                  <SelectForm label="Tipo de moneda" name="currency" :items="CURRENCYSELECT" id="currency" />
                  <FieldForm label="Tasa de Impuesto" type="number" name="taxRate" id="taxRate" />
                  <FieldForm label="Descuento" type="number" name="discount" id="discount" />
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
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { TYPECONTACTSELECT, COUNTRIES, CURRENCYSELECT } from "@/constants/";
import { SUPPLIERTABS, useSupplierForm } from "@/views/suppliers/";
import { SideBar, Card, Tabs, TabsContent, TabsTitle, FieldForm, SelectForm, TextAreaForm, AdressesForm, EmailsForm, PhonesForm, BankAccountsForm, AcceptButton, CancelButton } from "@/components/";

const router = useRouter();
const route = useRoute();
const supplierId = route.params.id as string;

const { activeTab, meta, initializeForm, onSubmit } = useSupplierForm(supplierId);

onMounted(initializeForm);
</script>
