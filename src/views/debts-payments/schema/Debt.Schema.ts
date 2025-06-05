import { string, number, date, object } from 'yup';
import { PaymentMethod } from '@/views/debts-payments/domain/';

export const DebtPaymentSchema = object({
  id: string().optional(),
  amount: number().required('El monto es requerido').positive('El monto debe ser positivo'),
  date: date().required('La fecha es requerida'),
  method: string()
    .oneOf(Object.values(PaymentMethod), 'El método de pago debe ser uno de los valores permitidos')
    .required('El método de pago es requerido'),
});
