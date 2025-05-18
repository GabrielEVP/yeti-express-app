import { Invoice } from "@/views/invoices/";

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
   dueDates: [],
};
