import { object, string } from 'yup';

export const PhoneSchema = object({
  phone: string()
    .max(10, 'El numero de telefono puede tener como maximo 10 digitos')
    .required('El numero de telefono es requerido'),
});
