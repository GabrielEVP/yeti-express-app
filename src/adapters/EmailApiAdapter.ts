import { Email } from "@/models/";

export function adaptEmail(apiEmail: any): Email {
   return {
      id: apiEmail.id,
      email: apiEmail.email,
      type: apiEmail.type.toLowerCase() === "Work" ? "Work" : "Personal",
   };
}

export function adaptEmailForApi(email: Email): any {
   return {
      id: email.id,
      email: email.email,
      type: email.type.toLowerCase() === "Work" ? "Work" : "Personal",
   };
}
