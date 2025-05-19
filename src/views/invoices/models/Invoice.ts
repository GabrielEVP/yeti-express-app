export interface Invoice {
   id: string;
   number: string;
   date: string;
   status: "pending" | "paid" | "refused";
   totalAmount: number;
   totalTaxAmount: number;
   notes: string;
   clientId: string;
   userId: string;
   lines: InvoiceLine[];
   payments: InvoicePayment[];
}

export interface InvoiceLine {
   id: string;
   description: string;
   quantity: number;
   unitPrice: number;
   taxRate: number;
   totalAmount: number;
   totalTaxAmount: number;
   invoiceId: string;
   productId: string;
}

export interface InvoicePayment {
   id: string;
   date: string;
   amount: number;
   invoiceId: string;
   typePaymentId: string;
}
