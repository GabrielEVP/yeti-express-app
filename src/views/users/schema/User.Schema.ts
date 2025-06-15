import { string, object, ref } from 'yup';

export const UserSchema = object({
  name: string().required('el nombre del usuario es requerido'),
  email: string().email().required('el email del usuario es requerido'),
});

export const PasswordSchema = object({
  password: string().required('La contraseña es requerida').min(8, 'Tiene que tener como minimo 8 caracteres'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
});
