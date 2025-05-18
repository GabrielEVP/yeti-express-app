import * as yup from "yup";

export const SupplierSchema = yup.object({
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
      isBilling: yup.boolean(),
    })
  ),
  bankAccounts: yup.array(
    yup.object({
      name: yup.string().optional(),
      accountNumber: yup
        .string()
        .optional()
        .max(32, "El numero de cuenta puede tener como maximo 32 digitos"),
      type: yup.string().oneOf(["AH", "CO", "OT"]).optional(),
    })
  ),
  emails: yup.array(
    yup.object({
      email: yup.string().email().optional(),
      type: yup.string().oneOf(["Work", "Personal"]).optional(),
    })
  ),
  phones: yup.array(
    yup.object({
      name: yup.string().optional(),
      phone: yup
        .string()
        .max(10, "El numero de telefono puede tener como maximo 10 digitos")
        .optional(),
      type: yup.string().oneOf(["Work", "Personal"]).optional(),
    })
  ),
});
