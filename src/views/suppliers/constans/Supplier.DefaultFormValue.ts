import { Supplier } from "@/views/suppliers";
import { ADDRESSDEFAULTFORMVALUE } from "@/constants/";

export const DEFAULTSUPPLIERFORMVALUE: Supplier = {
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

export const DEFAULTBASICSUPPLIERFORMVALUE: Supplier = {
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
