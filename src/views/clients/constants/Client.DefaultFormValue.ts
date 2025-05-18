import { Client } from "@views/clients";
import { ADDRESSDEFAULTFORMVALUE } from "@/constants/";

export const DEFAULTCLIENTFORMVALUE: Client = {
   id: "",
   registrationNumber: "",
   legalName: "",
   type: "NT",
   website: "",
   country: "VE",
   currency: "USD",
   taxRate: 0.0,
   discount: 0.0,
   notes: "",
   userId: "",
   createdAt: "",
   updatedAt: "",
   events: [],
   addresses: [],
   emails: [],
   phones: [],
   bankAccounts: [],
};

export const DEFAULTBASICCLIENTFORMVALUE: Client = {
   id: "",
   registrationNumber: "",
   legalName: "",
   type: "NT",
   website: "",
   country: "VE",
   currency: "USD",
   taxRate: 0.0,
   discount: 0.0,
   notes: "",
   userId: "",
   createdAt: "",
   updatedAt: "",
   events: [],
   addresses: [ADDRESSDEFAULTFORMVALUE],
   emails: [],
   phones: [],
   bankAccounts: [],
};
