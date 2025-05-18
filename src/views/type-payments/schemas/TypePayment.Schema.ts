import { object, string } from "yup";

export const typePaymentSchema = object({
   name: string().required("El nombre del tipo de pago es requerido"),
});
