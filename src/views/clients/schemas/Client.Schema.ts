import { object, string, number, array } from "yup";
import { AddressSchema, BankAccountSchema, EmailSchema, PhoneSchema } from "@/schemas/";

export const ClientSchema = object({
   legalName: string().required("Nombre Legal es requerido"),
   registrationNumber: string().required("Numero de registro Requerido"),
   type: string().oneOf(["NT", "JU", "GB", "OT"]),
   website: string().optional(),
   country: string().required(),
   currency: string().oneOf(["EUR", "USD", "BOV", "OT"]),
   discount: number().optional(),
   notes: string().optional(),
   addresses: array().of(AddressSchema),
   bankAccounts: array().of(BankAccountSchema),
   emails: array().of(EmailSchema),
   phones: array().of(PhoneSchema),
});
