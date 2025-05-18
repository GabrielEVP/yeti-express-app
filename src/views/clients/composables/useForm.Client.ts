import { ref } from "vue";
import { useUserId, useVeeForm } from "@/composables/";
import { Client, ClientSchema, DEFAULTCLIENTFORMVALUE, clientAppRoutes, getClient, putClients, postClients } from "@views/clients";

export function useClientForm(clientId?: string) {
   const activeTab = ref("general");
   const { userId } = useUserId();

   const { initializeForm, onSubmit, meta } = useVeeForm<Client, string>({
      id: clientId,
      getById: getClient,
      create: postClients,
      update: (values, id) => putClients(values, id),
      defaultRoute: clientAppRoutes.list,
      messages: {
         createError: "Error al crear el cliente",
         updateError: "Error al actualizar el cliente",
         createSuccess: "Cliente creado correctamente",
         updateSuccess: "Cliente actualizado correctamente",
      },
      validation: {
         schema: ClientSchema,
         initialValues: { ...DEFAULTCLIENTFORMVALUE, userId: userId.value },
      },
   });

   return {
      activeTab,
      initializeForm,
      onSubmit,
      meta,
   };
}
