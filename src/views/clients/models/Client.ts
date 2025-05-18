import { Address, Email, Phone, BankAccount, Event } from "@/models/";

export interface Client {
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
   events: ClientEvent[];
   addresses: Address[];
   emails: Email[];
   phones: Phone[];
   bankAccounts: BankAccount[];
   createdAt: string;
   updatedAt: string;
}

export interface ClientEvent extends Event {
   clientId: string;
}
