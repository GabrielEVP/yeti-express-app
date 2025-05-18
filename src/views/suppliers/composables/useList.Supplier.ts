import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { usePagination, useModal, useFetch, useFilterSortSearch, useDeleteWithFeedback } from "@/composables/";
import { Supplier, getSuppliers, deleteSupplier, getFilterSuppliers } from "@/views/suppliers/";

export function useSupplierList() {
   const suppliers = ref<Supplier[]>([]);

   const { searchQuery, filters, applyFilters, handleSort, setDynamicFilters } = useFilterSortSearch({
      columns: ["legal_name", "email", "type", "country"], // Ajustar si hay columnas específicas de Supplier
      fetchFn: getFilterSuppliers,
      dataRef: suppliers,
   });

   const { handleSubmit } = useForm({
      initialValues: {
         type: "",
         country: "",
      },
   });

   const applySelectFilters = handleSubmit((formValues) => {
      setDynamicFilters(formValues);
   });

   const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(suppliers, 15);

   const { isLoading, fetchError, executeFetch } = useFetch<Supplier[]>({
      fetchFunction: getSuppliers,
      errorMessageOnFailure: "Error al cargar proveedores",
   });

   onMounted(async () => {
      suppliers.value = await executeFetch();
   });

   const { deleteAndNotify } = useDeleteWithFeedback<string>({
      deleteFn: deleteSupplier,
      onSuccessMessage: "Proveedor eliminado exitosamente",
   });

   const { isOpen, selectedId, open, close } = useModal();

   const handleDeleteConfirmation = async () => {
      await deleteAndNotify(String(selectedId.value), async () => {
         suppliers.value = await executeFetch();
      });
      close();
   };

   return {
      suppliers,
      searchQuery,
      filters,
      applyFilters,
      applySelectFilters,
      handleSort,
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      paginatedItems,
      updatePage,
      isOpen,
      selectedId,
      open,
      close,
      handleDeleteConfirmation,
      isLoading,
      fetchError,
   };
}
