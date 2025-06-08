import { Employee } from '@/views/employees/domain/Employee';

export class EmployeeFormAdapter {
  static fromForm(form: any): Employee {
    return new Employee(
      form.id ?? '',
      form.name,
      form.email,
      form.password,
      form.role,
      form.active,
      form.userId,
      [],
      new Date(),
      new Date()
    );
  }

  static toForm(employee: Employee): any {
    return {
      id: employee.getId(),
      name: employee.getName(),
      email: employee.getEmail(),
      password: employee.getPassword(),
      role: employee.getRole(),
      active: employee.isActive(),
      userId: employee.getUserId(),
      createdAt: employee.getCreatedAt(),
      updatedAt: employee.getUpdatedAt(),
    };
  }
}
