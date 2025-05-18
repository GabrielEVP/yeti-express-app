import { Invoice } from "@/views/invoices/";
import { adaptLine, adaptPayment, adaptDueDate, adaptLineForApi, adaptPaymentForApi, adaptDueDateForApi } from "@/adapters/";

export function adaptInvoice(apiData: any): Invoice {
   return {
      id: apiData.id,
      number: apiData.number,
      date: apiData.date,
      status: apiData.status as "pending" | "paid" | "refused",
      totalAmount: apiData.total_amount,
      totalTaxAmount: apiData.total_tax_amount,
      notes: apiData.notes,
      clientId: apiData.client_id,
      userId: apiData.user_id,
      lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
      payments: Array.isArray(apiData.payments) ? apiData.payments.map(adaptPayment) : [],
      dueDates: Array.isArray(apiData.due_dates) ? apiData.due_dates.map(adaptDueDate) : [],
   };
}

export function adaptInvoiceForApi(invoice: Invoice): any {
   return {
      id: invoice.id,
      number: invoice.number,
      date: invoice.date,
      status: invoice.status,
      total_amount: invoice.totalAmount,
      total_tax_amount: invoice.totalTaxAmount,
      notes: invoice.notes,
      client_id: invoice.clientId,
      user_id: invoice.userId,
      lines: invoice.lines.map(adaptLineForApi),
      payments: invoice.payments.map(adaptPaymentForApi),
      due_dates: invoice.dueDates.map(adaptDueDateForApi),
   };
}
