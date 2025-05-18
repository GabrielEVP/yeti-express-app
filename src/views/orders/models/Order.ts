import { Line } from "@/models/";

export interface Order {
   id: string;
   number: string;
   date: string;
   status: "pending" | "paid" | "refused";
   totalAmount: number;
   totalTaxAmount: number;
   notes: string;
   clientId: string;
   userId: string;
   invoiceId: string;
   lines: Line[];
}
