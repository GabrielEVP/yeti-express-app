import { object, string } from "yup";

export const PhoneSchema = object({
   name: string().required("El nombre es requerido"),
   phone: string().max(10, "El numero de telefono puede tener como maximo 10 digitos").required("El numero de telefono es requerido"),
   type: string().oneOf(["Work", "Personal"]).required(),
});
