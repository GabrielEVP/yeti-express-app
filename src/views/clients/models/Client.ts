import { Event } from "@/models/";

export interface Client {
   id: string;
   legalName: string;
   registrationNumber: string;
   notes: string;
   events: ClientEvent[];
   addresses: ClientAddress[];
   emails: ClientEmail[];
   phones: ClientPhone[];
   userId: string;
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
   type: "work" | "personal";
}

export interface ClientPhone {
   id: string;
   name: string;
   phone: string;
   type: "work" | "personal";
}
