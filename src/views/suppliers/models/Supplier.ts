import { Address, Email, Phone, BankAccount, Event } from "@models";

export interface Supplier {
   id: string;
   registrationNumber: string;
   legalName: string;
   type: "NT" | "JU" | "GB" | "OT";
   website: string;
   country: string;
   currency: "EUR" | "USD" | "BOV" | "OT";
   taxRate: number;
   discount: number;
   notes: string;
   userId: string;
   events: SupplierEvent[];
   addresses: Address[];
   emails: Email[];
   phones: Phone[];
   bankAccounts: BankAccount[];
   createdAt: string;
   updatedAt: string;
}

export interface SupplierEvent extends Event {
   supplierId: string;
}
