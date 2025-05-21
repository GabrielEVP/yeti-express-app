import { User } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";
import { DELIVERY_EVENT_DEFINITION } from "@views/deliveries/";

export const CLIENT_EVENT_DEFINITIONS: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   client: {
      update_client: {
         icon: User,
         title: "Actualización de cliente",
         text: "Se han actualizado los datos del cliente",
      },
      ...DELIVERY_EVENT_DEFINITION,
   },
};
