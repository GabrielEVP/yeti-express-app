<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Empleador?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Empleador" @input="applyFilters" />
               <div class="relative">
                  <FilterButton> </FilterButton>
               </div>
            </div>
            <NewButton label="Nuevo Empleador" :URL="employerAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...EMPLOYER_TABLE_HEADER]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="employers.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(employer, id) in paginatedItems" :key="employer.id">
            <TableContent class="text-black dark:text-white">
               {{ employer.name }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ employer.email }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ employer.role }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(employer.id)" route="/employers" />
                  <EditButton :id="String(employer.id)" route="/employers/edit" />
                  <TrashButton @click="open(employer.id)" />
               </div>
            </TableContent>
         </TableRow>
      </TableDashboard>
   </SideBar>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { usePagination, useModal, useFetch, useFilterSortSearch, useDeleteWithFeedback } from "@/composables/";
import { Employer, getEmployers, deleteEmployer, getFilterEmployers, EMPLOYER_TABLE_HEADER, employerAppRoutes } from "@/views/employees";
import { SideBar, Card, TableContent, TableRow, TableDashboard, SearchForm, FilterButton, NewButton, TrashButton, EditButton, EyeButton, ConfirmationModal } from "@/components/";

const employers = ref<Employer[]>([]);

const { searchQuery, filters, applyFilters, handleSort, setDynamicFilters } = useFilterSortSearch({
   columns: ["name", "email", "role"],
   fetchFn: getFilterEmployers,
   dataRef: employers,
});

const { handleSubmit } = useForm({
   initialValues: {
      name: "",
      email: "",
      role: "",
   },
});

const applySelectFilters = handleSubmit((formValues) => {
   setDynamicFilters(formValues);
});

const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(employers, 15);

const { executeFetch } = useFetch<Employer[]>({
   fetchFunction: getEmployers,
   errorMessageOnFailure: "Error al cargar Empleadores",
});

onMounted(async () => {
   employers.value = await executeFetch();
});

const { deleteAndNotify } = useDeleteWithFeedback<string>({
   deleteFn: deleteEmployer,
   onSuccessMessage: "Empleador eliminado exitosamente",
});

const { isOpen, selectedId, open, close } = useModal();

const handleDeleteConfirmation = async () => {
   await deleteAndNotify(String(selectedId.value), async () => {
      employers.value = await executeFetch();
   });
   close();
};
</script>
