import { Purchase } from "@/views/purchases/";

export const INITIALPURCHASEFORMSTATE: Purchase = {
   id: "",
   number: "",
   date: new Date().toISOString().split("T")[0],
   status: "pending",
   totalAmount: 0,
   totalTaxAmount: 0,
   notes: "",
   supplierId: "",
   userId: "1",
   lines: [],
   payments: [],
   dueDates: [],
};
