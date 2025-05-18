import { object, string } from "yup";

export const BankAccountSchema = object({
   name: string().required("El nombre del banco es requerido"),
   accountNumber: string().required("El numero de cuenta es requerido").max(32, "El numero de cuenta puede tener como maximo 32 digitos"),
   type: string().oneOf(["AH", "CO", "OT"]).required(),
});
