import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { useFetchClient } from "@/views/clients";
import { mapEventsToLineContent } from "@/composables";
import { filterByDateMonth, percentageChange, sumBy, formatCurrency, formatCountWithPlural, formatPercentageChange } from "@/utils/";

export function useClientData(clientId: string) {
   const { client, deliveries, loadData } = useFetchClient(clientId);

   onMounted(async () => {
      await loadData();
   });

   // Timeline
   const lineContents = computed(() => (client.value?.events ? mapEventsToLineContent(client.value.events) : []));

   // Metrics
   const now = dayjs();
   const paidDeliverys = computed(() => deliveries.value.filter((i) => i.status === "paid"));
   const thisMonthDeliverys = computed(() => filterByDateMonth(paidDeliverys.value, (i) => i.date, now));
   const lastMonthDeliverys = computed(() => filterByDateMonth(paidDeliverys.value, (i) => i.date, now.subtract(1, "month")));

   const totalBilled = computed(() => sumBy(thisMonthDeliverys.value, (i) => Number(i.totalTaxAmount)));
   const totalLast = computed(() => sumBy(lastMonthDeliverys.value, (i) => Number(i.totalTaxAmount)));
   const billedChangePercent = computed(() => percentageChange(totalBilled.value, totalLast.value));

   const pendingDeliverys = computed(() => deliveries.value.filter((i) => i.status !== "paid"));
   const totalPending = computed(() => sumBy(pendingDeliverys.value, (i) => Number(i.totalTaxAmount)));
   const pendingCount = computed(() => pendingDeliverys.value.length);

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
         content: "Crear Delivery",
         url: `/deliveries/new/${clientId}`,
      },
      {
         content: "Crear presupuesto",
         url: `/orders/new/${clientId}`,
      },
   ];

   return {
      client,
      deliveries,
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
