import { object, string } from 'yup';

export const AddressSchema = object({
  address: string().required('Dirección requerida'),
});
