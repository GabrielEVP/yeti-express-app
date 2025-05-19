import { object, string, array } from "yup";

export const PhoneSchema = object({
   name: string().required("El nombre es requerido"),
   phone: string().max(10, "El numero de telefono puede tener como maximo 10 digitos").required("El numero de telefono es requerido"),
   type: string().oneOf(["Work", "Personal"]).required(),
});

export const EmailSchema = object({
   email: string().email("Tiene que ser un email").required("El email es requerido"),
   type: string().oneOf(["Work", "Personal"]).required(),
});

export const AddressSchema = object({
   country: string().required("País requerido"),
   address: string().required("Dirección requerida"),
   state: string().required("Estado requerido"),
   municipality: string().required("Municipio requerido"),
   postalCode: string().required("Código postal requerido"),
});

export const ClientSchema = object({
   legalName: string().required("Nombre Legal es requerido"),
   registrationNumber: string().required("Numero de registro Requerido"),
   notes: string().optional(),
   addresses: array().of(AddressSchema),
   emails: array().of(EmailSchema),
   phones: array().of(PhoneSchema),
});
