import { object, string } from 'yup';

export const BasicClientSchema = object({
  legal_name: string().required('Nombre Legal es requerido'),
  registration_number: string().required('Numero de registro Requerido'),
});
