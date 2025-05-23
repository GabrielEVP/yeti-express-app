import { User, Receipt } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const CLIENT_EVENT_DEFINITIONS: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   clients: {
      update_client: {
         icon: User,
         title: "Actualización de cliente",
         text: "Se han actualizado los datos del cliente",
      },

      create_delivery: {
         icon: Receipt,
         title: "Creación del delivery",
         text: "Se ha creado un nuevo delivery",
      },

      delete_delivery: {
         icon: Receipt,
         title: "Delivery Borrado",
         text: "Se ha eliminado el delivery",
      },
   },
};
