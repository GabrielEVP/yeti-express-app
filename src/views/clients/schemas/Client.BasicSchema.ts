import { object, string, number, array } from "yup";
import { AddressSchema } from "@/schemas/";

export const BasicClientSchema = object({
   legalName: string().required("Nombre Legal es requerido"),
   registrationNumber: string().required("Número de registro requerido"),
   type: string().oneOf(["NT", "JU", "GB", "OT"], "Tipo de cliente inválido").required("Tipo de cliente es requerido"),
   website: string().url("Debe ser una URL válida").nullable(),
   country: string().required("País es requerido"),
   currency: string().oneOf(["EUR", "USD", "BOV", "OT"], "Moneda inválida").required("Moneda es requerida"),
   discount: number().min(0, "El descuento no puede ser negativo").nullable(),
   notes: string().nullable(),
   addresses: array().of(AddressSchema),
});
