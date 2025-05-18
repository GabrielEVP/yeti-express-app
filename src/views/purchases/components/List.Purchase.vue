<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar esta Compra?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Compra" @input="handleApplyFilter" />
               <div class="relative">
                  <FilterButton>
                     <SelectForm v-model="selectedPurchaseStatus" label="Estado de la Compra" :items="[...STATUSBILLINGSELECT]" @change="handleApplyFilter">
                        <option value="">Todos</option>
                     </SelectForm>
                     <FieldForm type="date" id="date" label="Fecha inicial" v-model="startDate" :max="endDate" @change="handleApplyFilter" />
                     <FieldForm type="date" id="date" label="Fecha final" v-model="endDate" :min="startDate" @change="handleApplyFilter" />
                  </FilterButton>
               </div>
            </div>
            <NewButton label="Nuevo Compra" :URL="purchaseAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSINVOICES]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="purchases.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(purchase, id) in paginatedItems" :key="purchase.id">
            <TableContent class="text-black dark:text-white">
               {{ purchase.number }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ purchase.date }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ supplierNames[purchase.supplierId] || "Cargando..." }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               <Bagde :class="getStatusBillingClass(purchase.status)">
                  {{ getStatusBillingText(purchase.status) }}
               </Bagde>
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ purchase.totalTaxAmount }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(purchase.id)" route="/purchases" />
                  <EditButton :id="String(purchase.id)" route="/purchases/edit" />
                  <TrashButton @click="open(purchase.id)" />
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
import { STATUSBILLINGSELECT } from "@/constants/";
import { getStatusBillingClass, getStatusBillingText, getSupplierName } from "@utils";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { TABLEHEADERSINVOICES, Purchase, purchaseAppRoutes, deletePurchase, getFilterPurchases } from "@views/purchases";
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

const purchases = ref<Purchase[]>([]);

const searchQuery = ref("");
const selectedPurchaseStatus = ref("");

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
   select: [{ option: "status", value: selectedPurchaseStatus.value }],
   dateRange: {
      start: startDate.value,
      end: endDate.value,
   },
}));

const handleApplyFilter = async () => {
   const data = await getFilterPurchases(filters.value);

   purchases.value = Array.isArray(data) ? (data as Purchase[]) : [];
   currentPage.value = 1;
};

const startDate = ref("");
const endDate = ref("");
const supplierNames = ref<Record<string, string>>({});

onMounted(async () => {
   const today = new Date();
   startDate.value = format(startOfMonth(today), "yyyy-MM-dd");
   endDate.value = format(endOfMonth(today), "yyyy-MM-dd");

   await handleApplyFilter();

   for (const purchase of purchases.value) {
      await getSupplierName(supplierNames.value, purchase.supplierId);
   }
});

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(purchases, itemsPerPage);

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
      await deletePurchase(String(selectedId.value));
      await handleApplyFilter();
      triggerSuccess("Compra eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el Compra");
   }
};
</script>
