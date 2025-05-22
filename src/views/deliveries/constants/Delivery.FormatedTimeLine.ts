import { Receipt } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const DELIVERY_EVENT_DEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   update_delivery: {
      icon: Receipt,
      title: "Actualización del delivery",
      text: "Se ha actualizado la información de la delivery",
   },
   create_delivery: {
      icon: Receipt,
      title: "Creación del delivery",
      text: "Se ha creado una nueva delivery",
   },
   update_status_delivery: {
      icon: Receipt,
      title: "Estado del la delivery actualizado",
      text: "Se ha actualizado el estado de la delivery",
   },
   change_client_delivery: {
      icon: Receipt,
      title: "Cambio del cliente",
      text: "Se ha cambiado el cliente de la nueva delivery",
   },
   delete_delivery: {
      icon: Receipt,
      title: "Delivery Borrada",
      text: "Se ha eliminado la delivery",
   },
};
