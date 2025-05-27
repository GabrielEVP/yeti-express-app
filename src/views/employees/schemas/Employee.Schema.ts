import { object, string } from 'yup';

export const EmployeeSchema = object({
  name: string().required('El nombre es requerido'),
  email: string().email('debe ser un email').required('El email es requerido'),
  password: string().required('La contraseña es requerida'),
});
