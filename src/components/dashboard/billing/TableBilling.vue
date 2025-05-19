<template>
   <Card>
      <Table class="caption-bottom text-sm" v-if="data.length > 0">
         <TableHead>
            <TableRow class="bdata-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
               <TableContent>Numero</TableContent>
               <TableContent>Fecha</TableContent>
               <TableContent class="text-center">Importe</TableContent>
               <TableContent class="text-center">Estado</TableContent>
               <TableContent class="text-center">Acciones</TableContent>
            </TableRow>
         </TableHead>
         <TableBody>
            <TableRow v-for="dataItem in data" :key="dataItem.id">
               <TableContent class="text-gray-900 dark:text-gray-50">{{ dataItem.number }}</TableContent>
               <TableContent>{{ formatDateCustom(dataItem.date) }}</TableContent>
               <TableContent class="text-right">{{ dataItem.totalTaxAmount }} $</TableContent>
               <TableContent class="text-center">
                  <Bagde :class="[getStatusBillingClass(dataItem.status)]">
                     {{ getStatusBillingText(dataItem.status) }}
                  </Bagde>
               </TableContent>
               <TableContent class="text-center">
                  <div class="flex justify-center gap-2">
                     <EyeButton :id="dataItem.id" :route="url" />
                     <DownloadButton @click="handleDownload(dataItem.id)" />
                  </div>
               </TableContent>
            </TableRow>
         </TableBody>
      </Table>
      <EmptyData v-else />
   </Card>
</template>

<script setup lang="ts">
import { Card, Table, TableHead, TableRow, TableContent, TableBody, Bagde, EyeButton, DownloadButton, EmptyData } from "@/components/";
import { getStatusBillingClass, getStatusBillingText, formatDateCustom, TransformBinaryToPdf } from "@/utils/";
import { apiClient } from "@/services/";

const props = defineProps<{
   data: any[];
   url: string;
}>();

const handleDownload = async (id: string) => {
   try {
      const response = await apiClient.get(`${props.url}/${id}/download?ts=${Date.now()}`, {
         responseType: "blob",
      });
      TransformBinaryToPdf(response.data, "Delivery", id);
   } catch (error) {
      throw new Error("Error al abrir el PDF");
   }
};
</script>
