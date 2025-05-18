export interface Line {
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
