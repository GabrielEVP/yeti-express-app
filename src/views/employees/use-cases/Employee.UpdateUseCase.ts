import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';

export class UpdateEmployeeUseCase {
  private employeeRepository: IEmployeeRepository;

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(id: string, employee: Employee): Promise<Employee> {
    return await this.employeeRepository.update(id, employee);
  }
}
