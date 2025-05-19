import { Package, Receipt } from "lucide-vue-next";
import { type TimeLineContent } from "@models/LineContent";
import { CLIENTEVENTDEFINITIONS } from "@/views/clients/constants/Client.FormatedTimeLine";

export const EVENTTIMELINECONTENT: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   ...CLIENTEVENTDEFINITIONS,
   delivery: {
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
         title: "Estado de factura actualizado",
         text: "Se ha actualizado el estado de la factura",
      },
   },
   order: {
      update_order: {
         icon: Package,
         title: "Actualización de pedido",
         text: "Se ha actualizado la información del pedido",
      },
      create_order: {
         icon: Package,
         title: "Creación de pedido",
         text: "Se ha creado un nuevo pedido",
      },
      update_status_order: {
         icon: Package,
         title: "Estado del pedido actualizado",
         text: "Se ha actualizado el estado del pedido",
      },
   },
};
