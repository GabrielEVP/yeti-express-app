import { DueDate } from "@/models/";

export const DUEDATEDEFAULTFORMVALUE: DueDate = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   amount: 0,
   status: "pending",
   invoiceId: "",
};
