<template>
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <DangerAlert :show="showError" :message="alertMessage" />
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Tipo de precio?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Form :isOpen="isTypePriceModalOpen" :TypePriceId="selectedTypePriceId" @close="closeTypePriceModal" @saved="handleTypePriceSaved" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Tipo de precio" @input="handleApplyFilter" />
               <div class="relative">
                  <FilterButton>
                     <SelectForm label="Tipo de precio" v-model="selectedTypePriceType" :items="[...TYPEPRICESELECT]" @change="handleApplyFilter">
                        <option value="">Todos</option>
                     </SelectForm>
                  </FilterButton>
               </div>
            </div>
            <NewButton label="Agregar nuevo tipo de precio" @click="() => openTypePriceModal()" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSTYPEPRICE]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="typePrices.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(typePrice, id) in paginatedItems" :key="typePrice.id">
            <TableContent class="text-black dark:text-white">
               {{ typePrice.name }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ typePrice.type }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300"> {{ typePrice.margin }} {{ typePrice.type === "fixed" ? "$" : "%" }} </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EditButton @click="openTypePriceModal(typePrice.id)" />
                  <TrashButton @click="open(typePrice.id)" />
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
import { TABLEHEADERSTYPEPRICE, TYPEPRICESELECT, TypePrice, getTypePrices, deleteTypePrice, getFilterTypePrices } from "@/views/type-prices/";
import { Form } from "@/views/type-prices/components/";
import {
   SideBar,
   Card,
   TableContent,
   TableRow,
   TableDashboard,
   SearchForm,
   FilterButton,
   SelectForm,
   TrashButton,
   ConfirmationModal,
   NewButton,
   EditButton,
   SuccessAlert,
   DangerAlert,
} from "@/components/";

const isTypePriceModalOpen = ref(false);
const selectedTypePriceId = ref<string | undefined>(undefined);

const openTypePriceModal = (typePriceId?: string) => {
   selectedTypePriceId.value = typePriceId || undefined;
   isTypePriceModalOpen.value = true;
};

const closeTypePriceModal = () => {
   isTypePriceModalOpen.value = false;
   selectedTypePriceId.value = undefined;
};

const handleTypePriceSaved = async () => {
   const data = await getTypePrices();
   typePrices.value = Array.isArray(data) ? data : data ? [data] : [];
   closeTypePriceModal();
};

const typePrices = ref<TypePrice[]>([]);

onMounted(async () => {
   const data = await getTypePrices();
   typePrices.value = Array.isArray(data) ? data : data ? [data] : [];
});

const searchQuery = ref("");
const selectedTypePriceType = ref("");
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
   select: [{ option: "type", value: selectedTypePriceType.value }],
}));

const handleApplyFilter = async () => {
   const data = await getFilterTypePrices(filters.value);

   typePrices.value = Array.isArray(data) ? (data as TypePrice[]) : [];
   currentPage.value = 1;
};

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(typePrices, itemsPerPage);

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
      await deleteTypePrice(String(selectedId.value));

      const data = await getTypePrices();
      typePrices.value = Array.isArray(data) ? (data as TypePrice[]) : [];

      triggerSuccess("Tipo de precio eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el Tipo de precio");
   }
};
</script>
