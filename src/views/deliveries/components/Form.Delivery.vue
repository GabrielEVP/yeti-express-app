<template>
   <SideBar>
      <div class="flex justify-center items-center min-h-screen">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="h-full">
               <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
                  <template #mobile>
                     <option value="general">General</option>
                     <option value="receipt">Cliente a recibir</option>
                     <option value="notes">Notas</option>
                  </template>
                  <template #desktop>
                     <TabsTitle tab="general" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <FileText class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">General</span>
                     </TabsTitle>
                     <TabsTitle tab="receipt" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <NotebookPen class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Cliente a recibir</span>
                     </TabsTitle>
                     <TabsTitle tab="notes" :activeTab="activeTab" @update:activeTab="activeTab = $event">
                        <NotebookPen class="w-4 h-4 dark:text-white" />
                        <span class="m-4 dark:text-white">Notas</span>
                     </TabsTitle>
                  </template>
               </Tabs>
               <TabsContent tab="general" :activeTab="activeTab">
                  <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
                     <FieldForm type="date" label="Fecha del delivery" name="date" id="date" required />
                     <FieldForm type="number" label="Monto" name="total" id="total" />
                     <SelectForm label="Tipo de moneda" name="currency" :items="[...CURRENCYSELECT]" />
                  </div>
                  <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
                     <SelectForm label="Tipo de pago" name="paymentType" :items="[...PAYMENT_SELECT]" />
                     <SelectForm label="Repartidor" name="courierId" :items="[...couriers]" />
                     <FieldForm type="number" label="Comision" name="comision" id="comision" />
                  </div>
                  <div class="gap-6 lg:mb-8">
                     <ContentSelectorClient ref="contentSelectorRef" :client-id="clientId" :address-id="addressId" @update:clientId="clientId = $event" @update:addressId="addressId = $event" />
                  </div>
                  <LinesForm />
               </TabsContent>
               <TabsContent tab="receipt" :activeTab="activeTab">
                  <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                     <FieldForm label="Nombre completo" name="receipt.fullName" id="number" required />
                     <FieldForm label="Telefono" name="receipt.phone" id="number" required />
                  </div>
                  <FieldForm label="Direccion" name="receipt.address" id="receipt.address" required />
                  <div class="grid lg:grid-cols-4 grid-cols-1 gap-6">
                     <FieldForm label="Estado" name="receipt.state" id="receipt.state" required />
                     <FieldForm label="Ciudad" name="receipt.city" id="receipt.city" required />
                     <FieldForm label="Municipio" name="receipt.municipality" id="receipt.municipality" required />
                     <FieldForm label="Codigo Postal" name="receipt.postalCode" id="receipt.postalCode" required />
                  </div>
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
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { FileText, NotebookPen } from "lucide-vue-next";
import { useVeeForm } from "@/composables/";
import { SideBar, Card, Tabs, TabsContent, TabsTitle, FieldForm, SelectForm, TextAreaForm, AcceptButton, CancelButton } from "@/components/";
import { Courier, getCouriers } from "@views/couriers";
import {
   Delivery,
   DeliverySchema,
   deliveryAppRoutes,
   DELIVERY_DEFAULT_FORM_VALUE,
   getDelivery,
   postDeliveries,
   putDeliveries,
   LinesForm,
   CURRENCYSELECT,
   PAYMENT_SELECT,
   ContentSelectorClient,
} from "@/views/deliveries/";

const activeTab = ref("general");
const router = useRouter();

const route = useRoute();
const DeliveryId = route.params.id as string;

const { initializeForm, onSubmit, meta, setFieldValue } = useVeeForm<Delivery>({
   id: DeliveryId,
   getById: getDelivery,
   create: postDeliveries,
   update: (values, id) => putDeliveries(values, id),
   defaultRoute: deliveryAppRoutes.list,
   messages: {
      createError: "Error al crear el delivery",
      updateError: "Error al actualizar el delivery",
      createSuccess: "delivery creado correctamente",
      updateSuccess: "delivery actualizado correctamente",
   },
   validation: {
      schema: DeliverySchema,
      initialValues: { ...DELIVERY_DEFAULT_FORM_VALUE },
   },
});

onMounted(async () => {
   initializeForm();
});

const clientId = ref("");
const addressId = ref("");

const contentSelectorRef = ref<InstanceType<typeof ContentSelectorClient>>();

const routeClientId = route.params.clientId as string;

const couriers = ref<{ label: string; value: string }[]>([]);
onMounted(async () => {
   const response: any = await getCouriers();
   couriers.value = response.map((courier: Courier) => ({
      label: courier.firstName + " " + courier.lastName,
      value: courier.id,
   }));
});

watch(clientId, (newVal) => {
   setFieldValue("clientId", newVal);
});

watch(addressId, (newVal) => {
   setFieldValue("clientAddressId", newVal);
});
</script>
