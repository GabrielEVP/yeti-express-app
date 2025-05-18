import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { useFetchSupplier } from "@/views/suppliers";
import { mapEventsToLineContent } from "@/composables";
import { filterByDateMonth, percentageChange, sumBy, formatCurrency, formatCountWithPlural, formatPercentageChange } from "@/utils/";

export function useSupplierData(supplierId: string) {
   const { supplier, purchases, loadData } = useFetchSupplier(supplierId);

   onMounted(async () => {
      await loadData();
   });

   // Timeline
   const lineContents = computed(() => (supplier.value?.events ? mapEventsToLineContent(supplier.value.events) : []));

   // Metrics
   const now = dayjs();
   const paidInvoices = computed(() => purchases.value.filter((i) => i.status === "paid"));
   const thisMonthInvoices = computed(() => filterByDateMonth(paidInvoices.value, (i) => i.date, now));
   const lastMonthInvoices = computed(() => filterByDateMonth(paidInvoices.value, (i) => i.date, now.subtract(1, "month")));

   const totalBilled = computed(() => sumBy(thisMonthInvoices.value, (i) => Number(i.totalTaxAmount)));
   const totalLast = computed(() => sumBy(lastMonthInvoices.value, (i) => Number(i.totalTaxAmount)));
   const billedChangePercent = computed(() => percentageChange(totalBilled.value, totalLast.value));

   const pendingInvoices = computed(() => purchases.value.filter((i) => i.status !== "paid"));
   const totalPending = computed(() => sumBy(pendingInvoices.value, (i) => Number(i.totalTaxAmount)));
   const pendingCount = computed(() => pendingInvoices.value.length);

   // Textos formateados
   const totalBilledText = computed(() => formatCurrency(totalBilled.value));
   const billedChangeText = computed(() => formatPercentageChange(billedChangePercent.value));
   const totalPendingText = computed(() => formatCurrency(totalPending.value));
   const pendingCountText = computed(() => formatCountWithPlural(pendingCount.value, "compras pendiente", "compras pendientes"));

   const sectionActions = [
      {
         content: "Editar Proveedor",
         url: `/suppliers/edit/${supplierId}`,
      },
      {
         content: "Crear Compra",
         url: `/purchases/new/${supplierId}`,
      },
   ];

   return {
      supplier,
      purchases,
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
