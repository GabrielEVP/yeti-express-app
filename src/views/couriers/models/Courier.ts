import { Event } from "@/models/";

export interface Courier {
   id: string;
   firstName: string;
   lastName: string;
   phone: string;
   commission: number;
   active: boolean;
   userId: string;
   events: CourierEvent[];
   createdAt: string;
   updatedAt: string;
}

export interface CourierEvent extends Event {
   courierId: string;
}
