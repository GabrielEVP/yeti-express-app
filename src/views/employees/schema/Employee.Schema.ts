import { object, string, ref } from 'yup';

export const EmployeeSchema = object({
  name: string().required('El nombre es requerido'),
  email: string().email('debe ser un email').required('El email es requerido'),
  password: string().required('La contraseña es requerida').min(8, 'Tiene que tener como minimo 8 caracteres'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
});
