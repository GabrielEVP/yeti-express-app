import { ref } from "vue";
import { getClient, Client } from "@/views/clients";
import { getInvoicesByClientId, Invoice } from "@/views/invoices";
import { getOrdersByClientId, Order } from "@/views/orders";

export function useFetchClient(clientId: string) {
   const client = ref<Client | null>(null);
   const invoices = ref<Invoice[]>([]);
   const orders = ref<Order[]>([]);

   const loadData = async () => {
      if (!clientId) return;
      client.value = await getClient(clientId);
      invoices.value = await getInvoicesByClientId(clientId);
      orders.value = await getOrdersByClientId(clientId);
   };

   return { client, invoices, orders, loadData };
}
