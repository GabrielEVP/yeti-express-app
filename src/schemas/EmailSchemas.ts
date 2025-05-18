import { object, string } from "yup";

export const EmailSchema = object({
   email: string().email("Tiene que ser un email").required("El email es requerido"),
   type: string().oneOf(["Work", "Personal"]).required(),
});
