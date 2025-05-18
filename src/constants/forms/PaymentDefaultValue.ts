import { Payment } from "@/models/";

export const PAYMENTDEFAULTFORMSVALUE: Payment = {
   id: "",
   date: new Date().toISOString().split("T")[0],
   amount: 0,
   typePaymentId: "",
   invoiceId: "",
};
