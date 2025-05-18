import { object, number, date } from "yup";

export const paymentSchema = object({
   date: date().required("La fecha del pago es requerida"),
   amount: number().min(0, "El monto no puede ser negativo").required("El monto es requerido"),
});
