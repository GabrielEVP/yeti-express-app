import { Delivery, DeliveryLine, DeliveryPayment, DeliveryReceipt } from "@/views/deliveries/";

export const DELIVERY_PAYMENT_DEFAULT_FORM_VALUE: DeliveryPayment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   method: "cash",
   amount: 0,
   deliveryId: "",
};

export const DELIVERY_LINE_DEFAULT_FORM_VALUE: DeliveryLine = {
   id: "",
   description: "",
   quantity: 0,
   unitPrice: 0,
   taxRate: 0,
   totalAmount: 0,
   totalTaxAmount: 0,
   deliveryId: "",
};

export const DELIVERY_RECEIPT_DEFAULT_FORM_VALUE: DeliveryReceipt = {
   id: "",
   fullName: "",
   phone: "",
   address: "",
   state: "",
   city: "",
   municipality: "",
   postalCode: "",
   deliveryId: "",
   userId: "",
};

export const DELIVERY_DEFAULT_FORM_VALUE: Delivery = {
   id: "",
   number: "",
   date: new Date().toISOString().split("T")[0],
   status: "pending",
   currency: "USD",
   paymentType: "Full",
   totalAmount: 0,
   comision: 0,
   notes: "",
   clientId: "",
   clientAddressId: "",
   courierId: "",
   openBoxId: "",
   closeBoxId: "",
   userId: "",
   lines: [],
   receipts: DELIVERY_RECEIPT_DEFAULT_FORM_VALUE,
   payments: [],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
};
