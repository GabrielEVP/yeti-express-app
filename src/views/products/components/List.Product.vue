<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Producto?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Producto" @input="handleApplyFilter" />
               <div class="relative">
                  <FilterButton> </FilterButton>
               </div>
            </div>
            <NewButton label="Nuevo Producto" :URL="productAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSPRODUCTS]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="products.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(product, id) in paginatedItems" :key="product.id">
            <TableContent class="text-black dark:text-white">
               {{ product.name }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ product.stockQuantity }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ product.taxRate }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ product.purchasePrice }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(product.id)" route="/products" />
                  <EditButton :id="String(product.id)" route="/products/edit" />
                  <TrashButton @click="open(product.id)" />
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
import { TABLEHEADERSPRODUCTS, Product, productAppRoutes, getProducts, deleteProduct, getFilterProducts } from "@views/products";
import {
   SideBar,
   Card,
   TableContent,
   TableRow,
   TableDashboard,
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

const products = ref<Product[]>([]);

onMounted(async () => {
   const data = await getProducts();
   products.value = Array.isArray(data) ? data : data ? [data] : [];
});

const searchQuery = ref("");
const selectedProductType = ref("");
const selectedCountry = ref("");
const sort = ref<{ column: string; order: "asc" | "desc" }>({
   column: "legal_name",
   order: "asc",
});

const handleSort = async (sortConfig: { column: string; order: "asc" | "desc" }) => {
   sort.value = sortConfig;
   handleApplyFilter();
};

const filters = computed(() => ({
   search: searchQuery.value,
   sort: sort.value,
   select: [
      { option: "type", value: selectedProductType.value },
      { option: "country", value: selectedCountry.value },
   ],
}));

const handleApplyFilter = async () => {
   const data = await getFilterProducts(filters.value);

   products.value = Array.isArray(data) ? (data as Product[]) : [];
   currentPage.value = 1;
};

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(products, itemsPerPage);

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
      await deleteProduct(String(selectedId.value));

      const data = await getProducts();
      products.value = Array.isArray(data) ? (data as Product[]) : [];

      triggerSuccess("Producto eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el Producto");
   }
};
</script>
