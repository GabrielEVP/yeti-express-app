import { Payment } from "@/models/";

export function adaptPayment(apiPayment: any): Payment {
   return {
      id: apiPayment.id,
      date: apiPayment.date,
      amount: apiPayment.amount,
      typePaymentId: apiPayment.type_payment_id,
      invoiceId: apiPayment.invoice_id,
   };
}

export function adaptPaymentForApi(payment: Payment): any {
   return {
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      type_payment_id: payment.typePaymentId,
      invoice_id: payment.invoiceId,
   };
}
