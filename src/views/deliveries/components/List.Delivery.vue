<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar esta Delivery?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Delivery" @input="handleApplyFilter" />
               <div class="relative">
                  <FilterButton>
                     <SelectForm v-model="selectedDeliveryStatus" label="Estado de la Delivery" :items="[...STATUSBILLINGSELECT]" @change="handleApplyFilter">
                        <option value="">Todos</option>
                     </SelectForm>
                     <FieldForm type="date" id="date" label="Fecha inicial" v-model="startDate" :max="endDate" @change="handleApplyFilter" />
                     <FieldForm type="date" id="date" label="Fecha final" v-model="endDate" :min="startDate" @change="handleApplyFilter" />
                  </FilterButton>
               </div>
            </div>
            <NewButton label="Nueva Delivery" :URL="deliveryAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSINVOICES]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="deliveries.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(delivery, id) in paginatedItems" :key="delivery.id">
            <TableContent class="text-black dark:text-white">
               {{ delivery.number }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ formatDateCustom(delivery.date) }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ clientNames[delivery.clientId] || "Cargando..." }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               <Bagde :class="getStatusBillingClass(delivery.status)">
                  {{ getStatusBillingText(delivery.status) }}
               </Bagde>
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300"> {{ delivery.totalTaxAmount }} $ </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(delivery.id)" route="/deliveries" />
                  <EditButton :id="String(delivery.id)" route="/deliveries/edit" />
                  <Download @click="handleDownload(delivery.id)" />
                  <TrashButton @click="open(delivery.id)" />
               </div>
            </TableContent>
         </TableRow>
      </TableDashboard>
      <SuccessAlert :show="showSuccess" :message="alertMessage" />
      <DangerAlert :show="showError" :message="alertMessage" />
   </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useModal, usePagination, useAlert } from "@/composables/";
import { getStatusBillingClass, getStatusBillingText, getClientName, formatDateCustom } from "@utils";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { TABLEHEADERSINVOICES, Delivery, deliveryAppRoutes, deleteDelivery, getFilterDeliverys, getPdfDelivery, STATUSBILLINGSELECT } from "@views/deliveries";
import {
   SideBar,
   Card,
   TableContent,
   TableRow,
   TableDashboard,
   Bagde,
   FieldForm,
   SearchForm,
   FilterButton,
   SelectForm,
   NewButton,
   TrashButton,
   EditButton,
   EyeButton,
   ConfirmationModal,
   SuccessAlert,
   DangerAlert,
} from "@/components/";
import Download from "@components/buttons/Download.vue";

const deliveries = ref<Delivery[]>([]);

const searchQuery = ref("");
const selectedDeliveryStatus = ref("");

const sort = ref<{ column: string; order: "asc" | "desc" }>({
   column: "date",
   order: "asc",
});

const handleSort = async (sortConfig: { column: string; order: "asc" | "desc" }) => {
   sort.value = sortConfig;
   handleApplyFilter();
};

const filters = computed(() => ({
   search: searchQuery.value,
   sort: sort.value,
   select: [{ option: "status", value: selectedDeliveryStatus.value }],
   dateRange: {
      start: startDate.value,
      end: endDate.value,
   },
}));

const handleApplyFilter = async () => {
   const data = await getFilterDeliverys(filters.value);

   deliveries.value = Array.isArray(data) ? (data as Delivery[]) : [];
   currentPage.value = 1;
};

const startDate = ref("");
const endDate = ref("");
const clientNames = ref<Record<string, string>>({});

onMounted(async () => {
   const today = new Date();
   startDate.value = format(startOfMonth(today), "yyyy-MM-dd");
   endDate.value = format(endOfMonth(today), "yyyy-MM-dd");

   await handleApplyFilter();

   for (const delivery of deliveries.value) {
      await getClientName(clientNames.value, delivery.clientId);
   }
});

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(deliveries, itemsPerPage);

const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

const router = useRouter();

if (router.options.history.state?.successMessage) {
   const successMessage = String(router.options.history.state.successMessage || "");
   triggerSuccess(successMessage);

   window.history.replaceState({}, document.title);
}

const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
   try {
      await deleteDelivery(String(selectedId.value));
      await handleApplyFilter();
      triggerSuccess("Delivery eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el Delivery");
   }
};

const handleDownload = async (deliveryId: string) => {
   try {
      getPdfDelivery(deliveryId);
   } catch (error) {
      triggerError("Error al abrir el PDF de la factura");
   }
};
</script>
