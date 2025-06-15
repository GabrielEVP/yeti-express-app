import { object, string, array } from 'yup';

export const AddressSchema = object({
  address: string().required('Dirección requerida'),
});

export const EmailSchema = object({
  email: string().email('Tiene que ser un email').required('El email es requerido'),
});

export const PhoneSchema = object({
  phone: string().max(10, 'El numero de telefono puede tener como maximo 10 digitos').required('El numero de telefono es requerido'),
});

export const ClientSchema = object({
  legalName: string().required('Nombre Legal es requerido'),
  registrationNumber: string().required('Numero de documento es Requerido'),
  addresses: array().of(AddressSchema),
  emails: array().of(EmailSchema),
  phones: array().of(PhoneSchema),
});
