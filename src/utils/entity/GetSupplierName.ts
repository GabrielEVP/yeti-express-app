import { Supplier, getSupplier } from "@views/suppliers";

export const getSupplierName = async (
  supplierNames: Record<string, string>,
  id: string
) => {
  if (!supplierNames[id]) {
    const data = await getSupplier(id);
    const supplierData = data as Supplier;
    supplierNames[id] = supplierData?.legalName || "Nombre no disponible";
  }
};
