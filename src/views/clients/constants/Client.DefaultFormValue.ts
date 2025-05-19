import { Client, ClientAddress, ClientEmail, ClientPhone } from "@views/clients";

export const EMAILDEFAULTFORMVALUES: ClientEmail = {
   id: "",
   email: "",
   type: "Work",
} as const;

export const ADDRESSDEFAULTFORMVALUE: ClientAddress = {
   id: "",
   address: "",
   city: "",
   state: "",
   municipality: "",
   postalCode: "",
};

export const PHONEDEFAULTFORMVALUE: ClientPhone = {
   id: "",
   name: "",
   phone: "",
   type: "Work",
};

export const DEFAULTCLIENTFORMVALUE: Client = {
   id: "",
   registrationNumber: "",
   legalName: "",
   notes: "",
   userId: "",
   createdAt: "",
   updatedAt: "",
   events: [],
   addresses: [],
   emails: [],
   phones: [],
};

export const DEFAULTBASICCLIENTFORMVALUE: Client = {
   id: "",
   registrationNumber: "",
   legalName: "",
   notes: "",
   userId: "",
   createdAt: "",
   updatedAt: "",
   events: [],
   addresses: [ADDRESSDEFAULTFORMVALUE],
   emails: [],
   phones: [],
};
