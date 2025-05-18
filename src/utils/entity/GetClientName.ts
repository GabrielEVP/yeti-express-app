
import { Client, getClient } from "@views/clients";

export const getClientName = async (clientNames: Record<string, string>, id: string) => {
    if (!clientNames[id]) {
      const data = await getClient(id);
      const clientData = data as Client;
      clientNames[id] = clientData?.legalName || "Nombre no disponible";
    }
  };