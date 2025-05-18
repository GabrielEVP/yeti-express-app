<template>
   <SideBar>
      <DangerAlert :show="showError" :message="alertMessage" />
      <div class="flex justify-center items-center min-h-screen">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="h-full">
               <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
                  <template #mobile>
                     <option value="general">General</option>
                     <option value="dueDates">Vencimientos</option>
                     <option value="payments">Pagos</option>
                     <option value="notes">Notas</option>
                  </template>
                  <template #desktop>
                     <TabsTitle tab="general" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <FileText class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">General</span>
                     </TabsTitle>
                     <TabsTitle tab="dueDates" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <CalendarDays class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Vencimientos</span>
                     </TabsTitle>
                     <TabsTitle tab="payments" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <HandCoins class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Pagos</span>
                     </TabsTitle>
                     <TabsTitle tab="notes" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <NotebookPen class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Notas</span>
                     </TabsTitle>
                  </template>
               </Tabs>
               <TabsContent tab="general" :activeTab="activeTab">
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                     <FieldForm label="Número de compra" name="number" id="number" required />
                     <FieldForm type="date" label="Fecha de compra" name="date" id="date" required />
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mb-8">
                     <FieldFormDisabled label="Monto sin IVA" id="totalAmount" v-model="totalAmount" />
                     <FieldFormDisabled label="Monto con IVA" id="totalTaxAmount" v-model="totalTaxAmount" />
                  </div>
                  <div class="gap-6 lg:mb-8">
                     <SelectorBasicSupplier :supplier-id="supplierId" @update:supplier-id="(value: string) => {supplierId = value}" />
                  </div>
                  <LinesForm />
               </TabsContent>
               <TabsContent tab="dueDates" :activeTab="activeTab">
                  <DueDatesForm />
               </TabsContent>
               <TabsContent tab="payments" :activeTab="activeTab">
                  <PaymentsForm />
               </TabsContent>
               <TabsContent tab="notes" :activeTab="activeTab">
                  <TextAreaForm label="Notas" id="notes" rows="32" />
               </TabsContent>
               <div class="space-x-2 flex justify-end">
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
import { useForm } from "vee-validate";
import { FileText, CalendarDays, HandCoins, NotebookPen } from "lucide-vue-next";
import { useAlert, useCalculeAmount } from "@/composables/";
import { Purchase, PurchaseSchema, purchaseAppRoutes, INITIALPURCHASEFORMSTATE, getPurchase, postPurchases, putPurchases } from "@/views/purchases/";
import {
   SideBar,
   Card,
   Tabs,
   TabsContent,
   TabsTitle,
   FieldForm,
   FieldFormDisabled,
   TextAreaForm,
   LinesForm,
   DueDatesForm,
   PaymentsForm,
   AcceptButton,
   CancelButton,
   DangerAlert,
   SelectorBasicSupplier,
} from "@/components/";

const activeTab = ref("general");

const route = useRoute();
const PurchaseId = route.params.id as string;

onMounted(async () => {
   if (PurchaseId) {
      const data = (await getPurchase(PurchaseId)) as Purchase;
      setValues({ ...data });
   }
});

const { handleSubmit, defineField, setValues, values, setFieldValue, meta } = useForm<Purchase>({
   validationSchema: PurchaseSchema,
   initialValues: { ...INITIALPURCHASEFORMSTATE },
});

const [supplierId] = defineField("supplierId");
const [totalAmount] = defineField("totalAmount");
const [totalTaxAmount] = defineField("totalTaxAmount");

useCalculeAmount(values, setFieldValue as any);

const router = useRouter();
const { showError, alertMessage, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
   let response: any;
   let errorMessage: string;

   if (PurchaseId) {
      errorMessage = "Error al actualizar la compra";
      response = await putPurchases(values, PurchaseId);
   } else {
      errorMessage = "Error al crear la compra";
      response = await postPurchases(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError(errorMessage);
   } else {
      await router.push({
         path: purchaseAppRoutes.list,
         state: {
            successMessage: PurchaseId ? "Compra actualizada correctamente" : "Compra creada correctamente",
         },
      });
   }
});
</script>
