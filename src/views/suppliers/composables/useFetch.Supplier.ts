import { ref } from "vue";
import { getSupplier, Supplier } from "@/views/suppliers";
import { getPurchasesBySupplierId, Purchase } from "@/views/purchases";

export function useFetchSupplier(supplierId: string) {
   const supplier = ref<Supplier | null>(null);
   const purchases = ref<Purchase[]>([]);

   const loadData = async () => {
      if (!supplierId) return;
      supplier.value = await getSupplier(supplierId);
      purchases.value = await getPurchasesBySupplierId(supplierId);
   };

   return { supplier, purchases, loadData };
}
