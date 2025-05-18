import { Receipt } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const PURCHASEEVENTDEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   update_purchase: {
      icon: Receipt,
      title: "Actualización de compra",
      text: "Se ha actualizado la información de la compra",
   },
   create_purchase: {
      icon: Receipt,
      title: "Creación de compra",
      text: "Se ha registrado una nueva compra",
   },
   update_status_purchase: {
      icon: Receipt,
      title: "Estado de la compra actualizado",
      text: "Se ha actualizado el estado de la compra",
   },
   change_supplier_purchase: {
      icon: Receipt,
      title: "Cambio de proveedor",
      text: "Se ha cambiado el proveedor de la compra",
   },
   delete_purchase: {
      icon: Receipt,
      title: "Compra borrada",
      text: "Se ha eliminado la compra",
   },
};
