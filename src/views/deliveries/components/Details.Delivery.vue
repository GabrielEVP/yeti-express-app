<template>
   <SideBar>
      <LoadingSkeleton v-if="!delivery" />
      <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 class="text-3xl font-bold tracking-tight">Delivery #{{ delivery.number }}</h1>
               <div class="flex items-center gap-2">
                  <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
                  |
                  <Bagde :class="getStatusBillingClass(delivery.status)">
                     {{ getStatusBillingText(delivery.status) }}
                  </Bagde>
               </div>
            </div>
            <div class="flex gap-2">
               <ActionsButton title="Acciones" :datas="sectionActions" />
            </div>
         </div>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
               <div class="p-6">
                  <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
                     <Building2 class="h-5 w-5" />
                     Información de la Delivery
                  </h2>
                  <div class="space-y-5">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionText title="Número de Delivery" :content="delivery.number" />
                        <SectionText title="Fecha de Emisión" :content="delivery.date" />
                        <SectionText title="status" :content="delivery.status" />
                        <SectionText title="paymentType" :content="delivery.paymentType" />
                        <SectionText title="currency" :content="delivery.currency" />
                        <SectionText title="Cliente" :content="delivery.clientId" />
                        <SectionText title="Repartidor" :content="delivery.courierId" />
                        <SectionText title="Comision" :content="delivery.comision" />
                        <SectionText title="Importe Total" :content="delivery.total + ' €'" />
                     </div>
                     <SectionText title="Notas" :content="delivery.notes" />
                     <div class="space-y-6 pt-8">
                        <LinesList :lines="delivery.lines" />
                        <LinesList :lines="delivery.lines" />
                        <LinesList :lines="delivery.lines" />
                        <PaymentsList :payments="delivery.payments" />
                     </div>
                  </div>
               </div>
            </Card>
            <TimeLineActivity :lineContents="lineContents" />
         </div>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { mapEventsToLineContent } from "@composables";
import { getStatusBillingClass, getStatusBillingText, getClientName } from "@utils";
import { Delivery, getDelivery, LinesList, PaymentsList } from "@views/deliveries";
import { SideBar, SectionText, Card, ActionsButton, Bagde, TimeLineActivity, LoadingSkeleton } from "@components";

const route = useRoute();
const deliveryId = route.params.id as string;

const delivery = ref<Delivery | null>(null);
const clientNames = ref<Record<string, string>>({});

const loadData = async () => {
   if (!deliveryId) return;
   delivery.value = await getDelivery(deliveryId);
};

onMounted(async () => {
   await loadData();
});

const lineContents = computed(() => (delivery.value?.events ? mapEventsToLineContent(delivery.value.events) : []));

onMounted(async () => {
   const data = await getDelivery(deliveryId);
   delivery.value = data as Delivery;

   await getClientName(clientNames.value, delivery.value.clientId);
});

const sectionActions = [
   {
      content: "Editar Delivery",
      url: `/deliveries/edit/${deliveryId}`,
   },
];
</script>
