<template>
   <SideBar>
      <DangerAlert :show="showError" :message="alertMessage" />
      <div class="flex justify-center items-center min-h-screen">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="h-full">
               <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
                  <template #mobile>
                     <option value="general">General</option>
                     <option value="notes">Notas</option>
                  </template>
                  <template #desktop>
                     <TabsTitle tab="general" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <FileText class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">General</span>
                     </TabsTitle>
                     <TabsTitle tab="notes" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <NotebookPen class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Notas</span>
                     </TabsTitle>
                  </template>
               </Tabs>
               <TabsContent tab="general" :activeTab="activeTab">
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                     <FieldForm label="Número de presupuesto" name="number" id="number" required />
                     <FieldForm type="date" label="Fecha de presupuesto" name="date" id="date" required />
                  </div>
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6 lg:mb-8">
                     <FieldFormDisabled label="Monto sin IVA" id="totalAmount" v-model="totalAmount" />
                     <FieldFormDisabled label="Monto con IVA" id="totalTaxAmount" v-model="totalTaxAmount" />
                  </div>
                  <div class="gap-6 lg:mb-8">
                     <SelectorBasicClient :client-id="clientId" @update:client-id="(value: string) => {clientId = value}" />
                  </div>
                  <LinesForm />
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
import { FileText, NotebookPen } from "lucide-vue-next";
import { useAlert, useCalculeAmount } from "@/composables/";
import { Order, OrderSchema, orderAppRoutes, INITIALORDERFORMSTATE, getOrder, postOrders, putOrders } from "@/views/orders/";
import { SideBar, Card, Tabs, TabsContent, TabsTitle, FieldForm, FieldFormDisabled, TextAreaForm, LinesForm, AcceptButton, CancelButton, DangerAlert, SelectorBasicClient } from "@/components/";

const activeTab = ref("general");

const route = useRoute();
const OrderId = route.params.id as string;
const routeClientId = route.params.clientId as string;

onMounted(async () => {
   if (OrderId) {
      const data = (await getOrder(OrderId)) as Order;
      setValues(data);
   } else if (routeClientId) {
      setValues({ clientId: routeClientId });
   }
});

const { handleSubmit, defineField, setValues, values, setFieldValue, meta } = useForm<Order>({
   validationSchema: OrderSchema,
   initialValues: { ...INITIALORDERFORMSTATE },
});

const [clientId] = defineField("clientId");
const [totalAmount] = defineField("totalAmount");
const [totalTaxAmount] = defineField("totalTaxAmount");

useCalculeAmount(values, setFieldValue as any);

const router = useRouter();
const { showError, alertMessage, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
   let response: any;
   let errorMessage: string;

   if (OrderId) {
      errorMessage = "Error al actualizar la presupuesto";
      response = await putOrders(values, OrderId);
   } else {
      errorMessage = "Error al crear la presupuesto";
      response = await postOrders(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError(errorMessage);
   } else {
      await router.push({
         path: orderAppRoutes.list,
         state: {
            successMessage: OrderId ? "Presupuesto actualizada correctamente" : "Presupuesto creada correctamente",
         },
      });
   }
});
</script>
