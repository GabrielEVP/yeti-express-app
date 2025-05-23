import { Receipt } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const DELIVERY_EVENT_DEFINITION: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   deliveries: {
      create_delivery: {
         icon: Receipt,
         title: "Creación del delivery",
         text: "Se ha creado un nuevo delivery",
      },
      update_delivery: {
         icon: Receipt,
         title: "Actualización del delivery",
         text: "Se ha actualizado la información del delivery",
      },
      delete_delivery: {
         icon: Receipt,
         title: "Delivery Borrada",
         text: "Se ha eliminado el delivery",
      },

      update_status_canceled_delivery: {
         icon: Receipt,
         title: "Delivery cancelado",
         text: "Se ha cancelado el delivery",
      },
      update_status_transit_delivery: {
         icon: Receipt,
         title: "Delivery puesto en tránsito",
         text: "Se ha puesto en tránsito el delivery",
      },
      update_status_partial_paid_delivery: {
         icon: Receipt,
         title: "Delivery parcialmente pagado",
         text: "Se ha pagado parcialmente el delivery",
      },
      update_status_paid_delivery: {
         icon: Receipt,
         title: "Delivery pagado",
         text: "Se ha pagado delivery",
      },

      update_partial_paid_courier: {
         icon: Receipt,
         title: "Repartidor parcialmente pagado",
         text: "Se ha pagado parcialmente la comisión del repartidor",
      },
      update_paid_courier: {
         icon: Receipt,
         title: "Delivery pagado",
         text: "Se ha pagado la comision del repartidor",
      },
   },
};
