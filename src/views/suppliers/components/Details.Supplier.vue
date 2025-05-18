<template>
   <SideBar>
      <LoadingSkeleton v-if="!supplier" />
      <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 class="text-3xl font-bold tracking-tight">
                  {{ supplier.legalName }}
               </h1>
               <div class="flex items-center gap-2">
                  <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Registro</h5>
                  <Text>| {{ supplier.registrationNumber }}</Text>
                  <Bagde :class="getContactTypeClass(supplier.type)">
                     {{ getContactTypeText(supplier.type) }}
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
                     Información del Proveedor
                  </h2>
                  <div class="space-y-5">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionText title="Nombre Legal" :content="supplier.legalName" />
                        <SectionText title="Número de registro" :content="supplier.registrationNumber" />
                        <SectionText title="Tipo" :content="getContactTypeText(supplier.type)" />
                        <SectionText title="País" :content="getCountryName(supplier.country)" />
                        <SectionText title="Sitio Web" :content="supplier.website" />
                        <SectionText title="Tasa de Impuesto" :content="supplier.taxRate + '%'" />
                        <SectionText title="Descuento" :content="supplier.discount + '%'" />
                     </div>
                     <SectionText title="Notas" :content="supplier.notes" />
                     <AdressesList :addresses="supplier.addresses" />
                     <PhonesList :phones="supplier.phones" />
                     <EmailsList :emails="supplier.emails" />
                     <BankAccountsList :bankAccounts="supplier.bankAccounts" />
                  </div>
               </div>
            </Card>
            <TimeLineActivity :lineContents="lineContents" />
         </div>
         <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ActivityView title="Total Comprado">
               <div class="text-2xl font-bold">{{ totalBilledText }}</div>
               <p class="text-xs text-gray-500">{{ billedChangeText }}</p>
            </ActivityView>
            <ActivityView title="Compras Pendientes">
               <div class="text-2xl font-bold">{{ totalPendingText }}</div>
               <p class="text-xs text-gray-500">{{ pendingCountText }}</p>
            </ActivityView>
            <ActivityView title="Última Actualización">
               <div class="text-2xl font-bold">{{ formatDateShort(supplier.updatedAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(supplier.createdAt) }}</p>
            </ActivityView>
            <ActivityView title="Creación del proveedor">
               <div class="text-2xl font-bold">{{ formatDateShort(supplier.createdAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(supplier.createdAt) }}</p>
            </ActivityView>
         </div>
         <div class="space-y-4">
            <h2 class="text-2xl font-bold tracking-tight">Compras</h2>
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
               <TableBilling :data="purchases" url="/purchases" />
               <ChartBilling :documents="purchases" title="Estadística mensual de las Compras" label="Total compra" />
            </div>
         </div>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { getContactTypeText, getContactTypeClass, formatDateShort, formatRelativeDate, getCountryName } from "@/utils/";
import { useSupplierData } from "@/views/suppliers";
import {
   SideBar,
   SectionText,
   Card,
   PhonesList,
   BankAccountsList,
   EmailsList,
   AdressesList,
   TableBilling,
   ActionsButton,
   Bagde,
   Text,
   TimeLineActivity,
   ActivityView,
   ChartBilling,
   LoadingSkeleton,
} from "@/components/";

const route = useRoute();
const supplierId = route.params.id as string;

const { supplier, purchases, lineContents, totalBilledText, billedChangeText, totalPendingText, pendingCountText, sectionActions } = useSupplierData(supplierId);
</script>
