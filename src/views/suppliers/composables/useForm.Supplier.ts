import { ref } from "vue";
import { useUserId, useVeeForm } from "@/composables/";
import { Supplier, SupplierSchema, DEFAULTSUPPLIERFORMVALUE, supplierAppRoutes, getSupplier, putSuppliers, postSuppliers } from "@views/suppliers";

export function useSupplierForm(SupplierId?: string) {
   const activeTab = ref("general");
   const { userId } = useUserId();

   const { initializeForm, onSubmit, meta } = useVeeForm<Supplier, string>({
      id: SupplierId,
      getById: getSupplier,
      create: postSuppliers,
      update: (values, id) => putSuppliers(values, id),
      defaultRoute: supplierAppRoutes.list,
      messages: {
         createError: "Error al crear el proveedor",
         updateError: "Error al actualizar el proveedor",
         createSuccess: "Proveedor creado correctamente",
         updateSuccess: "Proveedor actualizado correctamente",
      },
      validation: {
         schema: SupplierSchema,
         initialValues: { ...DEFAULTSUPPLIERFORMVALUE, userId: userId.value },
      },
   });

   return {
      activeTab,
      initializeForm,
      onSubmit,
      meta,
   };
}
