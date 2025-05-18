<template>
  <SideBar>
    <div class="space-y-8 text-gray-900 dark:text-gray-100">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold tracking-tight">
            Compra #{{ purchase.number }}
          </h1>
          <div class="flex items-center gap-2">
            <h5
              class="text-sm font-medium text-muted-foreground dark:text-gray-400"
            >
              Estado
            </h5>
            |
            <Bagde :class="getStatusBillingClass(purchase.status)">
              {{ getStatusBillingText(purchase.status) }}
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
              Información de la Compra
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText
                  title="Número de Compra"
                  :content="purchase.number"
                />
                <SectionText
                  title="Fecha de Emisión"
                  :content="purchase.date"
                />
                <SectionText
                  title="Proveedor"
                  :content="supplierNames[purchase.supplierId] || 'Cargando...'"
                />
                <SectionText
                  title="Importe Total"
                  :content="purchase.totalAmount + ' €'"
                />
                <SectionText
                  title="Total Impuestos"
                  :content="purchase.totalTaxAmount + ' €'"
                />
              </div>
              <SectionText title="Notas" :content="purchase.notes" />
              <LinesList :lines="purchase.lines" />
              <DueDatesList :dueDates="purchase.dueDates" />
              <PaymentsList :payments="purchase.payments" />
            </div>
          </div>
        </Card>
        <TimeLineActivity />
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import {
  getStatusBillingClass,
  getStatusBillingText,
  getSupplierName,
} from "@utils";
import {
  Purchase,
  getPurchase,
  INITIALPURCHASEFORMSTATE,
} from "@views/purchases";
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  Bagde,
  TimeLineActivity,
  LinesList,
  DueDatesList,
  PaymentsList,
} from "@components";

const route = useRoute();
const purchaseId = route.params.id as string;

const purchase = ref<Purchase>(INITIALPURCHASEFORMSTATE);
const supplierNames = ref<Record<string, string>>({});

onMounted(async () => {
  const data = await getPurchase(purchaseId);
  purchase.value = data as Purchase;

  await getSupplierName(supplierNames.value, purchase.value.supplierId);
});

const sectionActions = [
  {
    content: "Editar Compra",
    url: `/purchases/edit/${purchaseId}`,
  },
];
</script>
