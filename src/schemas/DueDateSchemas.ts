import { object, string, number, date } from "yup";

export const dueDateSchema = object({
   date: date().required("La fecha de vencimiento es requerida"),
   amount: number().min(0, "El monto no puede ser negativo").required("El monto es requerido"),
   status: string().oneOf(["pending", "paid", "refused"], "Estado inválido"),
});
