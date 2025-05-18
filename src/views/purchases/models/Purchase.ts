import { Line, Payment, DueDate } from "@/models/";

export interface Purchase {
   id: string;
   number: string;
   date: string;
   status: "pending" | "paid" | "refused";
   totalAmount: number;
   totalTaxAmount: number;
   notes: string;
   supplierId: string;
   userId: string;
   lines: Line[];
   payments: Payment[];
   dueDates: DueDate[];
}
