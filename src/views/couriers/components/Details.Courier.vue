<template>
   <SideBar>
      <LoadingSkeleton v-if="!courier" />
      <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 class="text-3xl font-bold tracking-tight">{{ fullName }}</h1>
            <ActionsButton title="Acciones" :datas="sectionActions" />
         </div>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
               <div class="p-6 space-y-5">
                  <h2 class="text-xl font-semibold flex items-center gap-2 mb-4"><Building2 class="h-5 w-5" /> Información del Courier</h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <SectionText title="Nombre" :content="courier.firstName" />
                     <SectionText title="Apellido" :content="courier.lastName" />
                     <SectionText title="Teléfono" :content="courier.phone" />
                     <SectionText title="Comisión" :content="comisionFormated" />
                     <SectionText title="Activo" :content="activeFormated" />
                  </div>
               </div>
            </Card>
            <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
               <ActivityView title="Fecha de Creación">
                  <div class="text-2xl font-bold">{{ formatDateShort(courier.createdAt) }}</div>
                  <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.createdAt) }}</p>
               </ActivityView>
               <ActivityView title="Última Actualización">
                  <div class="text-2xl font-bold">{{ formatDateShort(courier.updatedAt) }}</div>
                  <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.updatedAt) }}</p>
               </ActivityView>
               <ActivityView title="Pagos pendientes">
                  <div class="text-2xl font-bold">{{ totalPendingThisMonth.toFixed(2) }} $</div>
                  <p class="text-xs text-gray-500">Faltan {{ unpaidDeliveriesCountThisMonth }} deliverys por pagar este mes</p>
               </ActivityView>
               <ActivityView title="Pagos realizados">
                  <div class="text-2xl font-bold">{{ totalPaidThisMonth.toFixed(2) }} $</div>
                  <p class="text-xs text-gray-500">Total de comisión pagada este mes</p>
               </ActivityView>
            </div>
         </div>
         <div class="space-y-4">
            <h2 class="text-2xl font-bold tracking-tight">Deliverys Pendientes por pagar</h2>
            <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
               <TableBilling :data="deliveries" url="/deliveries" />
               <ChartBilling :documents="deliveries" title="Estadística mensual de deliverys" label="Total deliverys" />
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
import { formatDateShort, formatRelativeDate, formatPercentage } from "@/utils/";
import { SideBar, SectionText, Card, ActionsButton, ActivityView, TableBilling, ChartBilling, LoadingSkeleton } from "@/components/";
import { Courier, getCourier } from "@/views/couriers";
import { Delivery, getDeliveriesByCourierId } from "@/views/deliveries";

// --- Estado & Ruta ---
const route = useRoute();
const courierId = route.params.id as string;
const courier = ref<Courier | null>(null);
const deliveries = ref<Delivery[]>([]);
const now = dayjs();

// --- Cargar datos ---
onMounted(async () => {
   courier.value = await getCourier(courierId);
   deliveries.value = await getDeliveriesByCourierId(courierId);
});

// --- Computeds ---
const fullName = computed(() => `${courier.value?.firstName} ${courier.value?.lastName}`);
const comisionFormated = computed(() => formatPercentage((Number(courier.value?.commission) || 0) / 100));
const activeFormated = computed(() => (courier.value?.active ? "Activo" : "Inactivo"));

const isSameMonthAndYear = (date: string) => {
   const d = dayjs(date);
   return d.month() === now.month() && d.year() === now.year();
};

const unpaidDeliveriesCountThisMonth = computed(() => deliveries.value.filter((delivery) => !delivery.courierPayments?.some((p) => isSameMonthAndYear(p.date))).length);

const totalPaidThisMonth = computed(() =>
   deliveries.value.reduce((sum, delivery) => {
      const pagos = delivery.courierPayments?.filter((p) => isSameMonthAndYear(p.date));
      return sum + (pagos?.reduce((acc, p) => acc + (Number(p.amount) || 0), 0) ?? 0);
   }, 0)
);

const totalCommissionThisMonth = computed(() => deliveries.value.filter((delivery) => isSameMonthAndYear(delivery.date)).reduce((acc, delivery) => acc + (Number(delivery.comision) || 0), 0));

const totalPendingThisMonth = computed(() => Number((totalCommissionThisMonth.value - totalPaidThisMonth.value).toFixed(2)));

const sectionActions = [
   {
      content: "Editar Courier",
      url: `/couriers/edit/${courierId}`,
   },
];
</script>
