import { Employee } from '@/views/employees/domain/';

export const adaptEmployee = (apiData: any): Employee => {
  return new Employee(
    apiData.id,
    apiData.name,
    apiData.email,
    apiData.password,
    apiData.role,
    apiData.active,
    apiData.userId,
    [],
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
