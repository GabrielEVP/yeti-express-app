import { object, string, number, date, array, mixed } from "yup";

export const lineSchema = object({
   description: string().required("La descripción es requerida"),
   quantity: number().min(1, "Cantidad mínima es 1").required("La cantidad es requerida"),
   unitPrice: number().min(0, "El precio unitario no puede ser negativo").required("El precio es requerido"),
   totalAmount: number().min(0, "El total debe ser positivo").required("El total es requerido"),
});

export const paymentSchema = object({
   date: date().required("La fecha del pago es requerida"),
   method: mixed<"cash" | "mobile payment" | "bank_transfer" | "other">()
      .oneOf(["cash", "mobile payment", "bank_transfer", "other"], "Método de pago inválido")
      .required("El método de pago es requerido"),
   amount: number().min(0.01, "El monto debe ser mayor que 0").required("El monto es requerido"),
});

export const receiptSchema = object({
   fullName: string().required("El nombre completo es requerido"),
   phone: string().required("El teléfono es requerido"),
   address: string().required("La dirección es requerida"),
   state: string().required("El estado es requerido"),
   city: string().required("La ciudad es requerida"),
   municipality: string().required("El municipio es requerido"),
   postalCode: string().required("El código postal es requerido"),
});

export const DeliverySchema = object({
   date: date().required("La fecha de la entrega es requerida"),
   status: mixed<"pending" | "paid" | "refused">().oneOf(["pending", "paid", "refused"], "Estado inválido").required("El estado de la entrega es requerido"),
   currency: mixed<"USD" | "BOV" | "OTH">().oneOf(["USD", "BOV", "OTH"], "Moneda inválida").required("La moneda es requerida"),
   paymentType: mixed<"partial" | "full">().oneOf(["partial", "full"], "Tipo de pago inválido").required("El tipo de pago es requerido"),
   totalAmount: number().min(0, "El total debe ser mayor o igual a 0").required("El total es requerido"),
   comision: number().min(0).required("La comisión es requerida"),
   notes: string().nullable(),
   lines: array().of(lineSchema).min(1, "Debe haber al menos una línea de entrega"),
   receipt: receiptSchema.required("El recibo es requerido"),
   payments: array().of(paymentSchema),
});
