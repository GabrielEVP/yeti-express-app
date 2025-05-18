<template>
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <DangerAlert :show="showError" :message="alertMessage" />
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este categoria?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Form :isOpen="isCategoryModalOpen" :categoryId="selectedCategoryId" @close="closeCategoryModal" @saved="handleCategorySaved" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar categoria" @input="handleApplyFilter" />
            </div>
            <NewButton label="Agregar nuevo tipo de precio" @click="() => openCategoryModal()" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...TABLEHEADERSCATEGORY]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="Categories.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="category in paginatedItems" :key="category.id">
            <TableContent class="text-black dark:text-white">
               {{ category.name }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <!-- ✅ Pasamos el id como string -->
                  <EditButton @click="openCategoryModal(category.id)" />
                  <TrashButton @click="open(category.id)" />
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
import { TABLEHEADERSCATEGORY, Category, getCategories, deleteCategory, getFilterCategories } from "../../../views/categories/";
import { Form } from "@/views/categories/components/";
import { SideBar, Card, TableContent, TableRow, TableDashboard, SearchForm, TrashButton, ConfirmationModal, NewButton, EditButton, SuccessAlert, DangerAlert } from "@/components/";

const isCategoryModalOpen = ref(false);
const selectedCategoryId = ref<string | undefined>(undefined);

const openCategoryModal = (CategoryId?: string | number) => {
   selectedCategoryId.value = CategoryId != null ? String(CategoryId) : undefined;
   isCategoryModalOpen.value = true;
};

const closeCategoryModal = () => {
   isCategoryModalOpen.value = false;
   selectedCategoryId.value = undefined;
};

const handleCategorySaved = async () => {
   const data = await getCategories();
   Categories.value = Array.isArray(data) ? data : data ? [data] : [];
   closeCategoryModal();
};

const Categories = ref<Category[]>([]);

onMounted(async () => {
   const data = await getCategories();
   Categories.value = Array.isArray(data) ? data : data ? [data] : [];
});

const searchQuery = ref("");
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
}));

const handleApplyFilter = async () => {
   const data = await getFilterCategories(filters.value);

   Categories.value = Array.isArray(data) ? (data as Category[]) : [];
   currentPage.value = 1;
};

const itemsPerPage = 15;
const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(Categories, itemsPerPage);

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
      await deleteCategory(String(selectedId.value));

      const data = await getCategories();
      Categories.value = Array.isArray(data) ? (data as Category[]) : [];

      triggerSuccess("categoria eliminado exitosamente");
   } catch (error) {
      triggerError("Error al eliminar el tipo de pago");
   }
};
</script>
