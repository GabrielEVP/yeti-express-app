import { Employer } from "@/views/employees";
export const adaptEmployer = (data: any): Employer => {
   return {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      active: data.active,
      userId: data.userId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
   };
};

export const adaptEmployerForApi = (employer: Employer): any => {
   return {
      name: employer.name,
      email: employer.email,
      password: employer.password,
      role: employer.role,
      active: employer.active,
      userId: employer.userId,
   };
};
