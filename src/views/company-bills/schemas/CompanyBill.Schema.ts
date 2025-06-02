import { object, string, number, date, mixed } from "yup";
import { PaymentMethod } from "@/views/company-bills/domain/enums/PaymentMethod";

export const CompanyBillSchema = object({
  date: date().required("La fecha es requerida"),
  name: string().required("El nombre es requerido"),
  description: string().required("La descripción es requerida"),
  method: mixed().oneOf(Object.values(PaymentMethod), "Método de pago inválido").required("El método de pago es requerido"),
  amount: number().required("El monto es requerido").min(0, "El monto debe ser mayor a 0"),
  userId: string().required("El usuario es requerido"),
});
