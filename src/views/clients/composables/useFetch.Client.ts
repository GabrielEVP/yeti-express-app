import { ref } from "vue";
import { getClient, Client } from "@/views/clients";
import { getInvoicesByClientId, Invoice } from "@/views/invoices";

export function useFetchClient(clientId: string) {
   const client = ref<Client | null>(null);
   const invoices = ref<Invoice[]>([]);

   const loadData = async () => {
      if (!clientId) return;
      client.value = await getClient(clientId);
      invoices.value = await getInvoicesByClientId(clientId);
   };

   return { client, invoices, loadData };
}
