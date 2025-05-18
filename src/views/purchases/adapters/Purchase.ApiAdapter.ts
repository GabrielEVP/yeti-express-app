import { Purchase } from "@/views/purchases/";
import { adaptLine, adaptPayment, adaptDueDate, adaptLineForApi, adaptPaymentForApi, adaptDueDateForApi } from "@/adapters/";

export function adaptPurchase(apiData: any): Purchase {
   return {
      id: apiData.id,
      number: apiData.number,
      date: apiData.date,
      status: apiData.status as "pending" | "paid" | "refused",
      totalAmount: apiData.total_amount,
      totalTaxAmount: apiData.total_tax_amount,
      notes: apiData.notes,
      supplierId: apiData.supplier_id,
      userId: apiData.user_id,
      lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
      payments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptPayment) : [],
      dueDates: Array.isArray(apiData.due_dates) ? apiData.due_dates.map(adaptDueDate) : [],
   };
}

export function adaptPurchaseForApi(purchase: Purchase): any {
   return {
      id: purchase.id,
      number: purchase.number,
      date: purchase.date,
      status: purchase.status,
      total_amount: purchase.totalAmount,
      total_tax_amount: purchase.totalTaxAmount,
      notes: purchase.notes,
      supplier_id: purchase.supplierId,
      user_id: purchase.userId,
      lines: purchase.lines.map(adaptLineForApi),
      payments: purchase.payments.map(adaptPaymentForApi),
      due_dates: purchase.dueDates.map(adaptDueDateForApi),
   };
}
