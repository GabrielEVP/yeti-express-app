import { Employee, EmployeeEvent } from '@/views/employees/domain/';
import { adaptEvents } from '@/adapters/';

export const adaptEmployee = (apiData: any): Employee => {
  const events = Array.isArray(apiData.events) ? apiData.events.map(adaptEmployeeEvent) : [];

  return new Employee(
    apiData.id,
    apiData.name,
    apiData.email,
    apiData.password,
    apiData.role,
    apiData.active,
    apiData.userId,
    events,
    apiData.created_at,
    apiData.updated_at
  );
};

export const adaptEmployeeForApi = (employee: Employee): any => {
  return {
    name: employee.getName(),
    email: employee.getEmail(),
    password: employee.getPassword(),
    role: employee.getRole(),
    active: employee.isActive(),
    userId: employee.getUserId(),
    created_at: employee.getCreatedAt(),
    updated_at: employee.getUpdatedAt(),
  };
};

export function adaptEmployeeEvent(apiEvent: any): EmployeeEvent {
  const eventData = adaptEvents(apiEvent);
  return new EmployeeEvent(
    eventData.id,
    eventData.event,
    eventData.section,
    eventData.referenceTable,
    eventData.referenceId,
    new Date(eventData.createdAt),
    apiEvent.employer_id
  );
}
