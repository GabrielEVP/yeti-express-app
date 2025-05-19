<template>
   <SideBar>
      <div class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 class="text-3xl font-bold tracking-tight">Factura #{{ invoice.number }}</h1>
               <div class="flex items-center gap-2">
                  <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
                  |
                  <Bagde :class="getStatusBillingClass(invoice.status)">
                     {{ getStatusBillingText(invoice.status) }}
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
                     Información de la Factura
                  </h2>
                  <div class="space-y-5">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionText title="Número de Factura" :content="invoice.number" />
                        <SectionText title="Fecha de Emisión" :content="invoice.date" />
                        <SectionText title="Cliente" :content="clientNames[invoice.clientId]" />
                        <SectionText title="Importe Total" :content="invoice.totalAmount + ' €'" />
                        <SectionText title="Total Impuestos" :content="invoice.totalTaxAmount + ' €'" />
                     </div>
                     <SectionText title="Notas" :content="invoice.notes" />
                     <LinesList :lines="invoice.lines" />
                     <PaymentsList :payments="invoice.payments" />
                  </div>
               </div>
            </Card>
         </div>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { getStatusBillingClass, getStatusBillingText, getClientName } from "@utils";
import { Invoice, getInvoice, INITIALINVOICEFORMSTATE } from "@views/invoices";
import { SideBar, SectionText, Card, ActionsButton, Bagde, TimeLineActivity, LinesList, PaymentsList } from "@components";

const route = useRoute();
const invoiceId = route.params.id as string;

const invoice = ref<Invoice>(INITIALINVOICEFORMSTATE);
const clientNames = ref<Record<string, string>>({});

onMounted(async () => {
   const data = await getInvoice(invoiceId);
   invoice.value = data as Invoice;

   await getClientName(clientNames.value, invoice.value.clientId);
});

const sectionActions = [
   {
      content: "Editar Factura",
      url: `/invoices/edit/${invoiceId}`,
   },
];
</script>
