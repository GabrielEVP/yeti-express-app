import { object, string, array } from 'yup';
import { AddressSchema, EmailSchema, PhoneSchema } from '@/views/clients/schemas';

export const ClientSchema = object({
  legalName: string().required('Nombre Legal es requerido'),
  registrationNumber: string().required('Numero de documento es Requerido'),
  addresses: array().of(AddressSchema),
  emails: array().of(EmailSchema),
  phones: array().of(PhoneSchema),
});
