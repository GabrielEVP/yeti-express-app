import { Employee } from '@/views/employees/domain/';

export class EmployeeApiAdapter extends Employee {
  static fromApi(apiData: any): Employee {
    return new Employee(
      apiData.id,
      apiData.name,
      apiData.email,
      apiData.password,
      apiData.role,
      apiData.active,
      apiData.userId,
      apiData.timeLineContent,
      new Date(apiData.createdAt),
      new Date(apiData.updatedAt)
    );
  }

  static toApi(employee: Employee): EmployeeApiAdapter {
    return new EmployeeApiAdapter(
      employee.getId(),
      employee.getName(),
      employee.getEmail(),
      employee.getPassword(),
      employee.getRole(),
      employee.isActive(),
      employee.getUserId(),
      employee.getEvents(),
      employee.getCreatedAt(),
      employee.getUpdatedAt()
    );
  }
}
