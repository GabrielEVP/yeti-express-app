<template>
   <SideBar>
      <LoadingSkeleton v-if="!client" />
      <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 class="text-3xl font-bold tracking-tight">
                  {{ client.legalName }}
               </h1>
               <div class="flex items-center gap-2">
                  <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Registro</h5>
                  <Text>| {{ client.registrationNumber }}</Text>
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
                     Información del Cliente
                  </h2>
                  <div class="space-y-5">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionText title="Nombre Legal" :content="client.legalName" />
                        <SectionText title="Número de registro" :content="client.registrationNumber" />
                     </div>
                     <SectionText title="Notas" :content="client.notes" />
                     <AdressesList :addresses="client.addresses" />
                     <PhonesList :phones="client.phones" />
                     <EmailsList :emails="client.emails" />
                  </div>
               </div>
            </Card>
            <TimeLineActivity :lineContents="lineContents" />
         </div>
         <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ActivityView title="Total de Ganancias del mes">
               <div class="text-2xl font-bold">{{ totalBilledText }}</div>
               <p class="text-xs text-gray-500">{{ billedChangeText }}</p>
            </ActivityView>
            <ActivityView title="Deliverys Pendientes">
               <div class="text-2xl font-bold">{{ totalPendingText }}</div>
               <p class="text-xs text-gray-500">{{ pendingCountText }}</p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
               <div class="text-2xl font-bold">{{ formatDateShort(client.updatedAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(client.createdAt) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
               <div class="text-2xl font-bold">{{ formatDateShort(client.createdAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(client.createdAt) }}</p>
            </ActivityView>
         </div>
         <div class="space-y-4">
            <h2 class="text-2xl font-bold tracking-tight">Deliverys</h2>
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
               <TableBilling :data="deliveries" url="/deliveries" />
               <ChartBilling :documents="deliveries" title="Estadistica mensual de las Facturas" label="Total factura" />
            </div>
         </div>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { mapEventsToLineContent } from "@/composables";
import { formatDateShort, formatRelativeDate, filterByDateMonth, percentageChange, sumBy, formatCurrency, formatCountWithPlural, formatPercentageChange } from "@/utils/";
import { SideBar, SectionText, Card, TableBilling, ActionsButton, Text, TimeLineActivity, ActivityView, ChartBilling, LoadingSkeleton } from "@/components/";
import { getClient, Client, PhonesList, EmailsList, AdressesList } from "@/views/clients";
import { getDeliveriesByClientId, Delivery } from "@/views/deliveries";

const route = useRoute();
const clientId = route.params.id as string;

const client = ref<Client | null>(null);
const deliveries = ref<Delivery[]>([]);

const loadData = async () => {
   if (!clientId) return;
   client.value = await getClient(clientId);
   deliveries.value = await getDeliveriesByClientId(clientId);
};

onMounted(async () => {
   await loadData();
});

const lineContents = computed(() => (client.value?.events ? mapEventsToLineContent(client.value.events) : []));

const now = dayjs();
const paidDeliverys = computed(() => deliveries.value.filter((i) => i.status === "paid"));
const thisMonthDeliverys = computed(() => filterByDateMonth(paidDeliverys.value, (i) => i.date, now));
const lastMonthDeliverys = computed(() => filterByDateMonth(paidDeliverys.value, (i) => i.date, now.subtract(1, "month")));

const totalBilled = computed(() => sumBy(thisMonthDeliverys.value, (i) => Number(i.total)));
const totalLast = computed(() => sumBy(lastMonthDeliverys.value, (i) => Number(i.total)));
const billedChangePercent = computed(() => percentageChange(totalBilled.value, totalLast.value));

const pendingDeliverys = computed(() => deliveries.value.filter((i) => i.status !== "paid"));
const totalPending = computed(() => sumBy(pendingDeliverys.value, (i) => Number(i.total)));
const pendingCount = computed(() => pendingDeliverys.value.length);

const totalBilledText = computed(() => formatCurrency(totalBilled.value));
const billedChangeText = computed(() => formatPercentageChange(billedChangePercent.value));
const totalPendingText = computed(() => formatCurrency(totalPending.value));
const pendingCountText = computed(() => formatCountWithPlural(pendingCount.value, "Delivery pendiente", "Deliverys pendientes"));

const sectionActions = [
   {
      content: "Editar Cliente",
      url: `/clients/edit/${clientId}`,
   },
   {
      content: "Crear Delivery",
      url: `/deliveries/new/${clientId}`,
   },
];
</script>
