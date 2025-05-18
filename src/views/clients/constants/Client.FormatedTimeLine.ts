import { User } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";
import { ORDEREVENTDEFINITION } from "@views/orders/";
import { INVOICEEVENTDEFINITION } from "@views/invoices/";

export const CLIENTEVENTDEFINITIONS: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   client: {
      update: {
         icon: User,
         title: "Actualización de cliente",
         text: "Se han actualizado los datos del cliente",
      },
      ...INVOICEEVENTDEFINITION,
      ...ORDEREVENTDEFINITION,
   },
};
