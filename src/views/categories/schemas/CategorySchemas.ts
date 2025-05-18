import { object, string } from "yup";

export const categorySchema = object({
   name: string().required("El nombre de la categoria es requerido"),
});
