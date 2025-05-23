import { Receipt, User } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const COURIER_EVENT_DEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   update_courier: {
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
};
