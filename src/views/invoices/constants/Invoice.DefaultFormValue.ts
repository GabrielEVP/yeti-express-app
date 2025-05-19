import { Invoice, InvoiceLine, InvoicePayment } from "@/views/invoices/";

export const PAYMENTDEFAULTFORMSVALUE: InvoicePayment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   amount: 0,
   typePaymentId: "",
   invoiceId: "",
};

export const LINEDEFAULTFORMVALUE: InvoiceLine = {
   id: "",
   description: "",
   quantity: 0,
   unitPrice: 0,
   taxRate: 0,
   totalAmount: 0,
   totalTaxAmount: 0,
   invoiceId: "",
   productId: "",
};

export const INITIALINVOICEFORMSTATE: Invoice = {
   id: "",
   number: "",
   date: new Date().toISOString().split("T")[0],
   status: "pending",
   totalAmount: 0,
   totalTaxAmount: 0,
   notes: "",
   clientId: "",
   userId: "1",
   lines: [],
   payments: [],
};
