export interface Employer {
   id: string;
   name: string;
   email: string;
   password: string;
   role: "admin" | "employee";
   active: boolean;
   userId: string;
   createdAt: string;
   updatedAt: string;
}
