import { object, string, array } from "yup";

export const AddressSchema = object({
   country: string().required("País requerido"),
   address: string().required("Dirección requerida"),
   state: string().required("Estado requerido"),
   municipality: string().required("Municipio requerido"),
   postalCode: string().required("Código postal requerido"),
});

export const BasicClientSchema = object({
   legalName: string().required("Nombre Legal es requerido"),
   registrationNumber: string().required("Numero de registro Requerido"),
});
