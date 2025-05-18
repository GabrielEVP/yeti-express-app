import * as yup from "yup";

export const BasicSupplierSchema = yup.object({
  legalName: yup.string().required("Nombre Legal es requerido"),
  registrationNumber: yup.string().required("Numero de registro Requerido"),
  type: yup.string().oneOf(["NT", "JU", "GB", "OT"]),
  website: yup.string().optional(),
  country: yup.string().required(),
  currency: yup.string().oneOf(["EUR", "USD", "BOV", "OT"]),
  discount: yup.number().optional(),
  notes: yup.string().optional(),
  addresses: yup.array().of(
    yup.object({
      country: yup.string().required("País requerido"),
      address: yup.string().required("Dirección requerida"),
      state: yup.string().required("Estado requerido"),
      city: yup.string().required("Ciudad requerida"),
      municipality: yup.string().required("Municipio requerido"),
      postalCode: yup.string().required("Código postal requerido"),
    })
  ),
});
