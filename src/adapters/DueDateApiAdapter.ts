import { DueDate } from "@/models/";

export function adaptDueDate(apiDueDate: any): DueDate {
   return {
      id: apiDueDate.id,
      date: apiDueDate.date,
      amount: apiDueDate.amount,
      status: apiDueDate.status as "pending" | "paid" | "refused",
      invoiceId: apiDueDate.invoice_id,
   };
}

export function adaptDueDateForApi(dueDate: DueDate): any {
   return {
      id: dueDate.id,
      date: dueDate.date,
      amount: dueDate.amount,
      status: dueDate.status,
      invoice_id: dueDate.invoiceId,
   };
}
