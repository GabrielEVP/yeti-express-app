import * as yup from 'yup';
import { DebtStatus, PaymentMethod } from '@/views/debts/domain/';

export const DebtPaymentSchema = yup.object().shape({
  id: yup.string().optional(),
  amount: yup.number().required('El monto es requerido').positive('El monto debe ser positivo'),
  date: yup.date().required('La fecha es requerida'),
  method: yup
    .string()
    .oneOf(
      Object.values(PaymentMethod),
      'El método de pago debe ser uno de los valores permitidos'
    )
    .required('El método de pago es requerido')
});

export const DebtSchema = yup.object().shape({
  id: yup.string().optional(),
  amount: yup.number().required('El monto es requerido').positive('El monto debe ser positivo'),
  status: yup
    .string()
    .oneOf(Object.values(DebtStatus), 'El estado debe ser uno de los valores permitidos')
    .required('El estado es requerido'),
  client_id: yup.string().required('El cliente es requerido'),
  delivery_id: yup.string().required('La entrega es requerida'),
  payments: yup.array().of(DebtPaymentSchema).default([])
});

export const DebtFilterSchema = yup.object().shape({
  search: yup.string().optional(),
  status: yup
    .string()
    .oneOf([...Object.values(DebtStatus), ''], 'El estado debe ser uno de los valores permitidos')
    .optional(),
  client_id: yup.string().optional(),
  delivery_id: yup.string().optional(),
  min_amount: yup.number().positive('El monto mínimo debe ser positivo').optional(),
  max_amount: yup.number().positive('El monto máximo debe ser positivo').optional(),
  start_date: yup.date().optional(),
  end_date: yup.date().optional()
});