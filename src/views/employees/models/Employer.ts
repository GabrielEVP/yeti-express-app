import { Event } from "@/models/";

export interface Employer {
   id: string;
   name: string;
   email: string;
   password: string;
   role: "admin" | "basic";
   active: boolean;
   userId: string;
   events: EmployerEvent[];
   createdAt: string;
   updatedAt: string;
}

export interface EmployerEvent extends Event {
   employerId: string;
}
