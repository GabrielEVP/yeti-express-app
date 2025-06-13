import { Employee } from '@/views/employees';
import { adaptTimeLineContent } from '@/time-line-content/adapter';

export const adaptEmployee = (apiData: any = {}): Employee => {
  return {
    id: apiData.id ?? '',
    name: apiData.name ?? '',
    email: apiData.email ?? '',
    password: apiData.password ?? '',
    role: apiData.role ?? '',
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    createdAt: apiData.created_at ?? '',
    updatedAt: apiData.updated_at ?? '',
  };
};

export const adaptEmployeeForApi = (employee: Employee): any => {
  return {
    name: employee.name ?? '',
    email: employee.email ?? '',
    password: employee.password ?? '',
    role: employee.role ?? '',
  };
};
