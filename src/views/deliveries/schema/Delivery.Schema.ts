import { mixed, object, string } from 'yup';
import { ClientType } from '@views/clients';

export const receiptSchema = object({
  full_name: string().required('El nombre completo es requerido'),
  phone: string().required('El teléfono es requerido'),
  address: string().required('La dirección es requerida'),
});

export const anonymousClientSchema = object({
  legal_name: string().required('El nombre legal es requerido'),
  type: mixed<ClientType>().required('El tipo de cliente es requerido'),
  registration_number: string().required('El número de registro es requerido'),
  phone: string().required('El teléfono es requerido'),
});

export const DeliverySchema = object({
  notes: string().nullable(),
  receipt: receiptSchema.required('El recibo es requerido'),
  client_id: string(),
  payment_type: string().when('client_id', {
    is: (val: string | undefined | null) => !!val,
    then: (schema) => schema.required('El tipo de pago es requerido cuando se selecciona un cliente regular'),
    otherwise: (schema) => schema.optional(),
  }),
  anonymous_client: object().when('client_id', {
    is: (val: string | undefined | null) => !val,
    then: (schema) => anonymousClientSchema.required('La información del cliente anónimo es requerida'),
    otherwise: (schema) => schema.optional(),
  }),
});
