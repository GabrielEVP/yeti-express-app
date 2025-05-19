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
            <ActivityView title="Total Facturado">
               <div class="text-2xl font-bold">{{ totalBilledText }}</div>
               <p class="text-xs text-gray-500">{{ billedChangeText }}</p>
            </ActivityView>
            <ActivityView title="Facturas Pendientes">
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
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { formatDateShort, formatRelativeDate } from "@/utils/";
import { useClientData, PhonesList, EmailsList, AdressesList } from "@/views/clients";
import { SideBar, SectionText, Card, TableBilling, ActionsButton, Text, TimeLineActivity, ActivityView, ChartBilling, LoadingSkeleton } from "@/components/";

const route = useRoute();
const clientId = route.params.id as string;
const { client, deliveries, lineContents, totalBilledText, billedChangeText, totalPendingText, pendingCountText, sectionActions } = useClientData(clientId);
</script>
