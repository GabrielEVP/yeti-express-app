export interface Delivery {
   id: string;
   date: string;
   status: "pending" | "paid" | "refused";
   currency: "USD" | "BOV" | "OTHERS";
   typePayment: "Partial" | "Full";
   totalAmount: number;
   comision: number;
   notes: string;
   clientId: string;
   clientAddressId: string;
   courierId: string;
   openBoxId: string;
   closeBoxId: string;
   userId: string;
   deliveryLines: DeliveryLine[];
   deliveryReceipts: DeliveryReceipt;
   deliveryPayments: DeliveryPayment[];
   createdAt: string;
   updatedAt: string;
}

export interface DeliveryEvent extends Event {
   deliveryId: string;
}

export interface DeliveryReceipt {
   id: string;
   full_name: string;
   delivery_id: string;
   phone: string;
   address: string;
   state: string;
   city: string;
   municipality: string;
   postalCode: string;
   deliveryId: string;
   userId: string;
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
}

export interface DeliveryPayment {
   id: string;
   date: string;
   amount: number;
   deliveryId: string;
}
