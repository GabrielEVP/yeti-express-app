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
                     <FieldForm label="Número de factura" name="number" id="number" required />
                     <FieldForm type="date" label="Fecha de factura" name="date" id="date" required />
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mb-8">
                     <FieldForm label="Monto sin IVA" id="totalAmount" />
                  </div>
                  <div class="gap-6 lg:mb-8">
                     <SelectorBasicClient :client-id="clientId" @update:client-id="(value: string) => {clientId = value }" />
                  </div>
                  <LinesForm />
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
import { useAlert } from "@/composables/";
import { Delivery, DeliverySchema, deliveryAppRoutes, DELIVERY_DEFAULT_FORM_VALUE, getDelivery, postDeliverys, putDeliverys, LinesForm, PaymentsForm, SelectorBasicClient } from "@/views/deliveries/";
import { SideBar, Card, Tabs, TabsContent, TabsTitle, FieldForm, TextAreaForm, AcceptButton, CancelButton, DangerAlert } from "@/components/";

const activeTab = ref("general");

const route = useRoute();
const DeliveryId = route.params.id as string;
const routeClientId = route.params.clientId as string;

onMounted(async () => {
   if (DeliveryId) {
      const data = (await getDelivery(DeliveryId)) as Delivery;
      setValues(data);
   } else if (routeClientId) {
      setValues({ clientId: routeClientId });
   }
});

const { handleSubmit, defineField, setValues, values, setFieldValue, meta } = useForm<Delivery>({
   validationSchema: DeliverySchema,
   initialValues: {
      ...DELIVERY_DEFAULT_FORM_VALUE,
   },
});

const [clientId] = defineField("clientId");
const [totalAmount] = defineField("totalAmount");

const router = useRouter();
const { showError, alertMessage, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
   let response: any;
   let errorMessage: string;

   if (DeliveryId) {
      errorMessage = "Error al actualizar la factura";
      response = await putDeliverys(values, DeliveryId);
   } else {
      errorMessage = "Error al crear la factura";
      response = await postDeliverys(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError(errorMessage);
   } else {
      await router.push({
         path: deliveryAppRoutes.list,
         state: {
            successMessage: DeliveryId ? "Delivery actualizada correctamente" : "Delivery creada correctamente",
         },
      });
   }
});
</script>
