import { object, string, array } from 'yup';

export const AddressSchema = object({
  country: string().required('País requerido'),
});

export const PhoneSchema = object({
  phone: string()
    .max(10, 'El numero de telefono puede tener como maximo 10 digitos')
    .required('El numero de telefono es requerido'),
});

export const BasicClientSchema = object({
  legalName: string().required('Nombre Legal es requerido'),
  registrationNumber: string().required('Numero de registro Requerido'),
});
