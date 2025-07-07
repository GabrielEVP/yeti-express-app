import { object, string } from 'yup';

export const CourierSchema = object({
  first_name: string().required('El nombre es requerido'),
  last_name: string().required('El apellido es requerido'),
});
