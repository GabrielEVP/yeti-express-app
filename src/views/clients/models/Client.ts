import { Event } from "@/models/";

export interface Client {
   id: string;
   registrationNumber: string;
   legalName: string;
   notes: string;
   userId: string;
   events: ClientEvent[];
   addresses: ClientAddress[];
   emails: ClientEmail[];
   phones: ClientPhone[];
   createdAt: string;
   updatedAt: string;
}

export interface ClientEvent extends Event {
   clientId: string;
}

export interface ClientAddress {
   id: string;
   address: string;
   state: string;
   city: string;
   municipality: string;
   postalCode: string;
}

export interface ClientEmail {
   id: string;
   email: string;
   type: "Work" | "Personal";
}

export interface ClientPhone {
   id: string;
   name: string;
   phone: string;
   type: "Work" | "Personal";
}
