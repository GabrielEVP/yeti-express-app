import { ref } from "vue";
import { getClient, Client } from "@/views/clients";
import { getDeliverysByClientId, Delivery } from "@/views/deliveries";

export function useFetchClient(clientId: string) {
   const client = ref<Client | null>(null);
   const deliveries = ref<Delivery[]>([]);

   const loadData = async () => {
      if (!clientId) return;
      client.value = await getClient(clientId);
      deliveries.value = await getDeliverysByClientId(clientId);
   };

   return { client, deliveries, loadData };
}
