import { Receipt } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const INVOICEEVENTDEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   update_delivery: {
      icon: Receipt,
      title: "Actualización de factura",
      text: "Se ha actualizado la información de la factura",
   },
   create_delivery: {
      icon: Receipt,
      title: "Creación de factura",
      text: "Se ha creado una nueva factura",
   },
   update_status_delivery: {
      icon: Receipt,
      title: "Estado de la factura actualizado",
      text: "Se ha actualizado el estado de la factura",
   },
   change_client_delivery: {
      icon: Receipt,
      title: "Cambio de cliente",
      text: "Se ha cambiado el cliente de la nueva factura",
   },
   delete_delivery: {
      icon: Receipt,
      title: "Delivery Borrada",
      text: "Se ha eliminado la factura",
   },
};
