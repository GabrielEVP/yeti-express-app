import { Order } from "@/views/orders/";
import { adaptLine, adaptLineForApi } from "@/adapters/";

export function adaptOrder(apiData: any): Order {
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
      invoiceId: apiData.invoice_id,
      lines: Array.isArray(apiData.lines) ? apiData.lines.map(adaptLine) : [],
   };
}

export function adaptOrderForApi(Order: Order): any {
   return {
      id: Order.id,
      number: Order.number,
      date: Order.date,
      status: Order.status,
      total_amount: Order.totalAmount,
      total_tax_amount: Order.totalTaxAmount,
      notes: Order.notes,
      client_id: Order.clientId,
      user_id: Order.userId,
      invoice_id: Order.invoiceId,
      lines: Order.lines.map(adaptLineForApi),
   };
}
