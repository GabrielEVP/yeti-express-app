import { Delivery, DeliveryLine, DeliveryPayment } from "@/views/deliveries/";

export const PAYMENTDEFAULTFORMSVALUE: DeliveryPayment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   amount: 0,
   typePaymentId: "",
   deliveryId: "",
};

export const LINEDEFAULTFORMVALUE: DeliveryLine = {
   id: "",
   description: "",
   quantity: 0,
   unitPrice: 0,
   taxRate: 0,
   totalAmount: 0,
   totalTaxAmount: 0,
   deliveryId: "",
   productId: "",
};

export const INITIALINVOICEFORMSTATE: Delivery = {
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
