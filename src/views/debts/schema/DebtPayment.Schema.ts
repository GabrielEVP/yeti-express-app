import { string, number, object } from 'yup';
import { PaymentMethod } from '@/views/debts/';

export const DebtPaymentSchema = object({
  amount: number().required('El monto es requerido').positive('El monto debe ser positivo'),
  method: string()
    .oneOf(Object.values(PaymentMethod), 'El método de pago debe ser uno de los valores permitidos')
    .required('El método de pago es requerido'),
});

export const FullDebtPaymentSchema = object({
  method: string()
    .oneOf(Object.values(PaymentMethod), 'El método de pago debe ser uno de los valores permitidos')
    .required('El método de pago es requerido'),
});
