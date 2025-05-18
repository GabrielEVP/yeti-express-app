import { object, string, mixed, number } from "yup";

export const typePriceSchema = object({
   name: string().required(),
   type: mixed<"fixed" | "percentage">().oneOf(["fixed", "percentage"]).required(),
   margin: number()
      .required()
      .min(0, "El margen no puede ser negativo")
      .max(100, "El margen no puede ser mayor a 100")
      .test("max-decimals", "El margen solo puede tener hasta 2 decimales", (value) => {
         if (value === undefined) return false;
         return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }),
});
