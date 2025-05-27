import type { Employee } from '@/views/employees/domain/Employee';

export interface IEmployeeRepository {
  getAll(): Promise<Employee[]>;
  getById(id: string): Promise<Employee | null>;
  create(employee: Employee): Promise<Employee>;
  update(id: string, employee: Employee): Promise<Employee>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<Employee[]>;
}
