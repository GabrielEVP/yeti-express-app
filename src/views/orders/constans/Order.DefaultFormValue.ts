import { Order } from "@/views/orders/";

export const INITIALORDERFORMSTATE: Order = {
   id: "",
   number: "",
   date: new Date().toISOString().split("T")[0],
   status: "pending",
   totalAmount: 0,
   totalTaxAmount: 0,
   notes: "",
   clientId: "",
   userId: "1",
   invoiceId: "",
   lines: [],
};
