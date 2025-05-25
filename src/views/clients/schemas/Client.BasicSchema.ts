import { object, string, array } from 'yup';

export const AddressSchema = object({
  country: string().required('País requerido'),
});

export const BasicClientSchema = object({
  legalName: string().required('Nombre Legal es requerido'),
  registrationNumber: string().required('Numero de registro Requerido'),
});
