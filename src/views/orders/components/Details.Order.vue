<template>
  <SideBar>
    <div class="space-y-8 text-gray-900 dark:text-gray-100">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold tracking-tight">
            Presupuesto #{{ order.number }}
          </h1>
          <div class="flex items-center gap-2">
            <h5
              class="text-sm font-medium text-muted-foreground dark:text-gray-400"
            >
              Estado
            </h5>
            |
            <Bagde :class="getStatusBillingClass(order.status)">
              {{ getStatusBillingText(order.status) }}
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
              Información de la Presupuesto
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText
                  title="Número de Presupuesto"
                  :content="order.number"
                />
                <SectionText title="Fecha de Emisión" :content="order.date" />
                <SectionText
                  title="Cliente"
                  :content="clientNames[order.clientId]"
                />
                <SectionText
                  title="Importe Total"
                  :content="order.totalAmount + ' €'"
                />
                <SectionText
                  title="Total Impuestos"
                  :content="order.totalTaxAmount + ' €'"
                />
              </div>
              <SectionText title="Notas" :content="order.notes" />
              <LinesList :lines="order.lines" />
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
  getClientName,
} from "@utils";
import { Order, getOrder, INITIALORDERFORMSTATE } from "@views/orders";
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  Bagde,
  TimeLineActivity,
  LinesList,
} from "@components";

const route = useRoute();
const orderId = route.params.id as string;

const order = ref<Order>(INITIALORDERFORMSTATE);
const clientNames = ref<Record<string, string>>({});

onMounted(async () => {
  const data = await getOrder(orderId);
  order.value = data as Order;

  await getClientName(clientNames.value, order.value.clientId);
});

const sectionActions = [
  {
    content: "Editar Presupuesto",
    url: `/orders/edit/${orderId}`,
  },
];
</script>
