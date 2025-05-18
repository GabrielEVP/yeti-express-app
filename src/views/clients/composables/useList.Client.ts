import { onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { usePagination, useModal, useFetch, useFilterSortSearch, useDeleteWithFeedback } from "@/composables/";
import { Client, getClients, deleteClient, getFilterClients } from "@/views/clients/";

export function useClientList() {
   const clients = ref<Client[]>([]);

   const { searchQuery, filters, applyFilters, handleSort, setDynamicFilters } = useFilterSortSearch({
      columns: ["legal_name", "email", "type", "country"],
      fetchFn: getFilterClients,
      dataRef: clients,
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

   const { currentPage, totalPages, startIndex, endIndex, paginatedItems, updatePage } = usePagination(clients, 15);

   const { isLoading, fetchError, executeFetch } = useFetch<Client[]>({
      fetchFunction: getClients,
      errorMessageOnFailure: "Error al cargar clientes",
   });

   onMounted(async () => {
      clients.value = await executeFetch();
   });

   const { deleteAndNotify } = useDeleteWithFeedback<string>({
      deleteFn: deleteClient,
      onSuccessMessage: "Cliente eliminado exitosamente",
   });

   const { isOpen, selectedId, open, close } = useModal();

   const handleDeleteConfirmation = async () => {
      await deleteAndNotify(String(selectedId.value), async () => {
         clients.value = await executeFetch();
      });
      close();
   };

   return {
      clients,
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
