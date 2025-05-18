import { object, string, date, array } from "yup";
import { lineSchema, paymentSchema, dueDateSchema } from "@schemas";

export const PurchaseSchema = object({
   number: string().required("El número de la factura es requerido"),
   date: date().required("La fecha de la factura es requerida"),
   status: string().oneOf(["pending", "paid", "refused"], "Estado inválido"),
   lines: array().of(lineSchema),
   payments: array().of(paymentSchema),
   dueDates: array().of(dueDateSchema),
});
