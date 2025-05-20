import { object, string } from "yup";

export const DealerSchema = object({
   firstName: string().required("El nombre es requerido"),
   lastName: string().required("El apellido es requerido"),
});
