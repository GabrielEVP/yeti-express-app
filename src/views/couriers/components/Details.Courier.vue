<template>
   <SideBar>
      <LoadingSkeleton v-if="!courier" />
      <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
         <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
               <h1 class="text-3xl font-bold tracking-tight">{{ courier.firstName }} {{ courier.lastName }}</h1>
               <div class="flex items-center gap-2">
                  <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">ID</h5>
                  <Text>| {{ courier.id }}</Text>
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
                     Información del Courier
                  </h2>
                  <div class="space-y-5">
                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SectionText title="Nombre" :content="courier.firstName" />
                        <SectionText title="Apellido" :content="courier.lastName" />
                        <SectionText title="Teléfono" :content="courier.phone" />
                        <SectionText title="Comisión" :content="courier.commission" />
                        <SectionText title="Activo" :content="courier.active ? 'Sí' : 'No'" />
                     </div>
                  </div>
               </div>
            </Card>
            <TimeLineActivity :lineContents="lineContents" />
         </div>
         <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ActivityView title="Fecha de Creación">
               <div class="text-2xl font-bold">{{ formatDateShort(courier.createdAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.createdAt) }}</p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
               <div class="text-2xl font-bold">{{ formatDateShort(courier.updatedAt) }}</div>
               <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.updatedAt) }}</p>
            </ActivityView>
         </div>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { formatDateShort, formatRelativeDate } from "@/utils/";
import { ref, computed, onMounted } from "vue";
import { Courier, getDealer } from "@/views/couriers";
import { SideBar, SectionText, Card, ActionsButton, Text, TimeLineActivity, ActivityView, LoadingSkeleton } from "@/components/";

const route = useRoute();
const dealerId = route.params.id as string;

const courier = ref<Courier | null>(null);
const lineContents = computed(() => []);

const loadData = async () => {
   try {
      const fetchedDealer = await getDealer(dealerId);
      courier.value = fetchedDealer;
   } catch (error) {
      console.error("Failed to fetch courier data:", error);
   }
};

onMounted(async () => {
   await loadData();
});

const sectionActions = [
   {
      content: "Editar Courier",
      url: `/couriers/edit/${dealerId}`,
   },
];
</script>
