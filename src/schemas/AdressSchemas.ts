import { object, string, boolean } from "yup";

export const AddressSchema = object({
   country: string().required("País requerido"),
   address: string().required("Dirección requerida"),
   state: string().required("Estado requerido"),
   city: string().required("Ciudad requerida"),
   municipality: string().required("Municipio requerido"),
   postalCode: string().required("Código postal requerido"),
   isBilling: boolean(),
});
