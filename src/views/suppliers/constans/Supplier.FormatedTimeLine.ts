import { User } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";
import { PURCHASEEVENTDEFINITION } from "@views/purchases/";

export const SUPPLIEREVENTDEFINITIONS: Record<string, Record<string, Omit<TimeLineContent, "date">>> = {
   supplier: {
      update: {
         icon: User,
         title: "Actualización de proveedor",
         text: "Se han actualizado los datos del proveedor",
      },
      ...PURCHASEEVENTDEFINITION,
   },
};
