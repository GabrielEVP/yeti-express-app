import { string, object } from "yup";

export const UserSchema = object({
   name: string().required("el nombre del usuario es requerido"),
   email: string().email().required("el email del usuario es requerido"),
});

export const PasswordSchema = object({
   password: string().required(),
   confirmPassword: string().oneOf(["password", undefined], "Passwords must match").required(),
});
