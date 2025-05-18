<template>
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <DangerAlert :show="showError" :message="alertMessage" />
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Tipo de pago?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Form :isOpen="isTypePaymentModalOpen" :TypePaymentId="selectedTypePaymentId" @close="closeTypePaymentModal" @saved="handleTypePaymentSaved" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Tipo de pago" @input="handleApplyFilter" />
            </div>
            <NewButton label="Agregar nuevo tipo de precio" @click="() => openTypePaymentModal()" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSTYPEPAYMENT]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="typePayments.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(typePayment, id) in paginatedItems" :key="typePayment.id">
            <TableContent class="text-black dark:text-white">
               {{ typePayment.name }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EditButton @click="openTypePaymentModal(typePayment.id)" />
                  <TrashButton @click="open(typePayment.id)" />
               </div>
            </TableContent>
         </TableRow>
      </TableDashboard>
   </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useModal, usePagination, useAlert } from "@/composables/";
import { TABLEHEADERSTYPEPAYMENT, TypePayment, getTypePayments, deleteTypePayment, getFilterTypePayments } from "@/views/type-payments/";
import { Form } from "@/views/type-payments/components/";
import { SideBar, Card, TableContent, TableRow, TableDashboard, SearchForm, TrashButton, ConfirmationModal, NewButton, EditButton, SuccessAlert, DangerAlert } from "@/components/";

const isTypePaymentModalOpen = ref(false);
const selectedTypePaymentId = ref<string | undefined>(undefined);

const openTypePaymentModal = (typePaymentId?: string) => {
   selectedTypePaymentId.value = typePaymentId || undefined;
   isTypePaymentModalOpen.value = true;
};

const closeTypePaymentModal = () => {
   isTypePaymentModalOpen.value = false;
   selectedTypePaymentId.value = undefined;
};

const handleTypePaymentSaved = async () => {
   const data = await getTypePayments();
   typePayments.value = Array.isArray(data) ? data : data ? [data] : [];
   closeTypePaymentModal();
};

const typePayments = ref<TypePayment[]>([]);

onMounted(async () => {
   const data = await getTypePayments();
   typePayments.value = Array.isArray(data) ? data : data ? [data] : [];
});

const searchQuery = ref("");
const selectedTypePaymentType = ref("");
const sort = ref<{ column: string; order: "asc" | "desc" }>({
   column: "name",
   order: "asc",
});

const handleSort = async (sortConfig: { column: string; order: "asc" | "desc" }) => {
   sort.value = sortConfig;
   handleApplyFilter();
};

const filters = computed(() => ({
   search: searchQuery.value,
   sort: sort.value,
   select: [{ option: "type", value: selectedTypePaymentType.value }],
}));

const handleApplyFilter = async () => {
   const data = await getFilterTypePayments(filters.value);

   typePayments.value = Array.isArray(data) ? (data as TypePayment[]) : [];
   currentPage.value = 1;
};

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(typePayments, itemsPerPage);

const router = useRouter();
const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

if (router.options.history.state?.successMessage) {
   const successMessage = String(router.options.history.state.successMessage || "");
   triggerSuccess(successMessage);

   window.history.replaceState({}, document.title);
}

const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
   try {
      await deleteTypePayment(String(selectedId.value));

      const data = await getTypePayments();
      typePayments.value = Array.isArray(data) ? (data as TypePayment[]) : [];

      triggerSuccess("Tipo de pago eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el Tipo de pago");
   }
};
</script>
