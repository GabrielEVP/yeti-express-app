export interface Delivery {
   id: string;
   number: string;
   date: string;
   status: "pending" | "paid" | "refused";
   totalAmount: number;
   totalTaxAmount: number;
   notes: string;
   clientId: string;
   userId: string;
   lines: DeliveryLine[];
   payments: DeliveryPayment[];
}

export interface DeliveryLine {
   id: string;
   description: string;
   quantity: number;
   unitPrice: number;
   taxRate: number;
   totalAmount: number;
   totalTaxAmount: number;
   deliveryId: string;
   productId: string;
}

export interface DeliveryPayment {
   id: string;
   date: string;
   amount: number;
   deliveryId: string;
   typePaymentId: string;
}
