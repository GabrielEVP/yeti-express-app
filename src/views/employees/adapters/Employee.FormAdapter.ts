import { Employee } from '@/views/employees/domain/Employee';

export function mapFormToEmployee(form: any): Employee {
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
