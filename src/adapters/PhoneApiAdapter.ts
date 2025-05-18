import { Phone } from "@/models/";

export function adaptPhone(apiPhone: any): Phone {
   return {
      id: apiPhone.id,
      name: apiPhone.name,
      phone: apiPhone.phone,
      type: apiPhone.type.toLowerCase() === "Work" ? "Work" : "Personal",
   };
}

export function adaptPhoneForApi(phone: Phone): any {
   return {
      id: phone.id,
      name: phone.name,
      phone: phone.phone,
      type: phone.type.toLowerCase() === "Work" ? "Work" : "Personal",
   };
}
