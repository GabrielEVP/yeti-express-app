import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { useFetchClient } from "@/views/clients";
import { mapEventsToLineContent } from "@/composables";
import { filterByDateMonth, percentageChange, sumBy, formatCurrency, formatCountWithPlural, formatPercentageChange } from "@/utils/";

export function useClientData(clientId: string) {
   const { client, invoices, orders, loadData } = useFetchClient(clientId);

   onMounted(async () => {
      await loadData();
   });

   // Timeline
   const lineContents = computed(() => (client.value?.events ? mapEventsToLineContent(client.value.events) : []));

   // Metrics
   const now = dayjs();
   const paidInvoices = computed(() => invoices.value.filter((i) => i.status === "paid"));
   const thisMonthInvoices = computed(() => filterByDateMonth(paidInvoices.value, (i) => i.date, now));
   const lastMonthInvoices = computed(() => filterByDateMonth(paidInvoices.value, (i) => i.date, now.subtract(1, "month")));

   const totalBilled = computed(() => sumBy(thisMonthInvoices.value, (i) => Number(i.totalTaxAmount)));
   const totalLast = computed(() => sumBy(lastMonthInvoices.value, (i) => Number(i.totalTaxAmount)));
   const billedChangePercent = computed(() => percentageChange(totalBilled.value, totalLast.value));

   const pendingInvoices = computed(() => invoices.value.filter((i) => i.status !== "paid"));
   const totalPending = computed(() => sumBy(pendingInvoices.value, (i) => Number(i.totalTaxAmount)));
   const pendingCount = computed(() => pendingInvoices.value.length);

   // Textos formateados
   const totalBilledText = computed(() => formatCurrency(totalBilled.value));
   const billedChangeText = computed(() => formatPercentageChange(billedChangePercent.value));
   const totalPendingText = computed(() => formatCurrency(totalPending.value));
   const pendingCountText = computed(() => formatCountWithPlural(pendingCount.value, "factura pendiente", "facturas pendientes"));

   const sectionActions = [
      {
         content: "Editar Cliente",
         url: `/clients/edit/${clientId}`,
      },
      {
         content: "Crear Factura",
         url: `/invoices/new/${clientId}`,
      },
      {
         content: "Crear presupuesto",
         url: `/orders/new/${clientId}`,
      },
   ];

   return {
      client,
      invoices,
      orders,
      lineContents,
      totalBilled,
      billedChangePercent,
      totalPending,
      pendingCount,
      totalBilledText,
      billedChangeText,
      totalPendingText,
      pendingCountText,
      sectionActions,
   };
}
