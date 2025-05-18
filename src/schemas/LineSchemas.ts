import { object, string, number } from "yup";

export const lineSchema = object({
   description: string().required("La descripción es requerida"),
   quantity: number().integer().positive("La cantidad debe ser mayor a 0").required("La cantidad es requerida"),
   unitPrice: number().min(0, "El precio unitario no puede ser negativo").required("El precio unitario es requerido"),
   taxRate: number().min(0, "La tasa de impuesto no puede ser negativa").required("La tasa de impuesto es requerida"),
   totalAmount: number().min(0, "El total no puede ser negativo").required("El total es requerido"),
   totalTaxAmount: number().min(0, "El total del impuesto no puede ser negativo").required("El total del impuesto es requerido"),
});
