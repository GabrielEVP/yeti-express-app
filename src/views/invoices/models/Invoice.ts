import { Line, Payment, DueDate } from "@/models/";

export interface Invoice {
   id: string;
   number: string;
   date: string;
   status: "pending" | "paid" | "refused";
   totalAmount: number;
   totalTaxAmount: number;
   notes: string;
   clientId: string;
   userId: string;
   lines: Line[];
   payments: Payment[];
   dueDates: DueDate[];
}
