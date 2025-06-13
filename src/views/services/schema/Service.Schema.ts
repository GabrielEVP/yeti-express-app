import { object, string, number, array } from 'yup';

export const billSchema = object({
  name: string().required('El nombre de la factura es requerido'),
  amount: number().required('El monto de la factura es requerido').min(0, 'El monto no puede ser negativo').typeError('El monto debe ser un número'),
});

export const serviceSchema = object({
  name: string().required('El nombre del servicio es requerido'),
  description: string().required('La descripción del servicio es requerida'),
  amount: number().required('El monto del servicio es requerido').min(0, 'El monto no puede ser negativo').typeError('El monto debe ser un número'),
  bills: array(billSchema).min(0, 'Debe haber al menos una factura').required('Las facturas son requeridas'),
});
