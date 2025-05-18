export interface DueDate {
   id: string;
   date: string;
   amount: number;
   status: "pending" | "paid" | "refused";
   invoiceId: string;
}
