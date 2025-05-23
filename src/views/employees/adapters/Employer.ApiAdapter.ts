import { Employer, EmployerEvent } from "@/views/employees";
import { adaptEvents, adaptEventsForApi } from "@/adapters/";

export const adaptEmployer = (apiData: any): Employer => {
   return {
      id: apiData.id,
      name: apiData.name,
      email: apiData.email,
      password: apiData.password,
      role: apiData.role,
      active: apiData.active,
      userId: apiData.userId,
      events: Array.isArray(apiData.events) ? apiData.lines.map(adaptEmployerEvent) : [],
      createdAt: apiData.createdAt,
      updatedAt: apiData.updatedAt,
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
      events: employer.events.map(adaptEmployerEventForApi),
      created_at: employer.createdAt,
      updated_at: employer.updatedAt,
   };
};

export function adaptEmployerEvent(apiEvent: any): EmployerEvent {
   return {
      ...adaptEvents(apiEvent),
      employerId: apiEvent.employer_id,
   };
}

export function adaptEmployerEventForApi(event: EmployerEvent): any {
   return {
      ...adaptEventsForApi(event),
      employer_id: event.employerId,
   };
}
