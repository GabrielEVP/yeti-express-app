import { Invoice, InvoiceLine, InvoicePayment } from "@/views/invoices/";

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
   };
}

export function adaptLine(apiLine: any): InvoiceLine {
   return {
      id: apiLine.id,
      description: apiLine.description,
      quantity: apiLine.quantity,
      unitPrice: apiLine.unit_price,
      taxRate: apiLine.tax_rate,
      totalAmount: apiLine.total_amount,
      totalTaxAmount: apiLine.total_tax_amount,
      invoiceId: apiLine.invoice_id,
      productId: apiLine.product_id,
   };
}

export function adaptLineForApi(line: InvoiceLine): any {
   return {
      id: line.id,
      description: line.description,
      quantity: line.quantity,
      unit_price: line.unitPrice,
      tax_rate: line.taxRate,
      total_amount: line.totalAmount,
      total_tax_amount: line.totalTaxAmount,
      invoice_id: line.invoiceId,
      product_id: line.productId,
   };
}

export function adaptPayment(apiPayment: any): InvoicePayment {
   return {
      id: apiPayment.id,
      date: apiPayment.date,
      amount: apiPayment.amount,
      typePaymentId: apiPayment.type_payment_id,
      invoiceId: apiPayment.invoice_id,
   };
}

export function adaptPaymentForApi(payment: InvoicePayment): any {
   return {
      id: payment.id,
      date: payment.date,
      amount: payment.amount,
      type_payment_id: payment.typePaymentId,
      invoice_id: payment.invoiceId,
   };
}
