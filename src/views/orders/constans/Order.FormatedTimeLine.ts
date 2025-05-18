import { Package } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const ORDEREVENTDEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   create_order: {
      icon: Package,
      title: "Creación de presupuesto",
      text: "Se ha creado un nuevo presupuesto",
   },
   update_order: {
      icon: Package,
      title: "Actualización de presupuesto",
      text: "Se ha actualizado la información del presupuesto",
   },
   update_status_order: {
      icon: Package,
      title: "Estado del presupuesto actualizado",
      text: "Se ha actualizado el estado del presupuesto",
   },
   change_client_order: {
      icon: Package,
      title: "Cambio de cliente",
      text: "Se ha cambiado el cliente de el presupuesto",
   },
   delete_order: {
      icon: Package,
      title: "Factura Borrada",
      text: "Se ha eliminado la factura",
   },
};
