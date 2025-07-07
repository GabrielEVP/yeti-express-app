import { date, mixed, number, object, string } from 'yup';

export const paymentSchema = object({
  date: date().required('La fecha del pago es requerida'),
  method: mixed<'cash' | 'mobile_payment' | 'bank_transfer' | 'other'>()
    .oneOf(['cash', 'mobile_payment', 'bank_transfer', 'other'], 'Método de pago inválido')
    .required('El método de pago es requerido'),
  amount: number().min(0.01, 'El monto debe ser mayor que 0').required('El monto es requerido'),
});

export const receiptSchema = object({
  full_name: string().required('El nombre completo es requerido'),
  phone: string().required('El teléfono es requerido'),
  address: string().required('La dirección es requerida'),
});

export const DeliverySchema = object({
  payment_type: mixed<'partial' | 'full'>().oneOf(['partial', 'full'], 'Tipo de pago inválido').required('El tipo de pago es requerido'),
  notes: string().nullable(),
  receipt: receiptSchema.required('El recibo es requerido'),
});
