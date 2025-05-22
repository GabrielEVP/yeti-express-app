import { Delivery, DeliveryLine, DeliveryClientPayment, DeliveryCourierPayment, DeliveryReceipt } from "@/views/deliveries/";

export const DELIVERY_CLIENT_PAYMENT_DEFAULT_FORM_VALUE: DeliveryClientPayment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   method: "cash",
   amount: 0,
   deliveryId: "",
   userId: "",
};

export const DELIVERY_COURIER_PAYMENT_DEFAULT_FORM_VALUE: DeliveryCourierPayment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   method: "cash",
   amount: 0,
   deliveryId: "",
   userId: "",
};

export const DELIVERY_LINE_DEFAULT_FORM_VALUE: DeliveryLine = {
   id: "",
   description: "",
   quantity: 0,
   unitPrice: 0,
   total: 0,
   deliveryId: "",
   userId: "",
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
   paymentType: "full",
   total: 0,
   comision: 0,
   notes: "",
   clientId: "",
   clientAddressId: "",
   courierId: "",
   openBoxId: "",
   closeBoxId: "",
   userId: "",
   events: [],
   lines: [],
   receipt: DELIVERY_RECEIPT_DEFAULT_FORM_VALUE,
   clientPayments: [],
   courierPayments: [],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString(),
};
