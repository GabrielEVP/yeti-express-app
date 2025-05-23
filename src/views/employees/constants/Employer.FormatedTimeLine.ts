import { User } from "lucide-vue-next";
import { TimeLineContent } from "@models/LineContent";

export const EMPLOYER_EVENT_DEFINITION: Record<string, Omit<TimeLineContent, "date">> = {
   update_employer: {
      icon: User,
      title: "Actualización del empleado",
      text: "Se han actualizado los datos del empleado",
   },
};
