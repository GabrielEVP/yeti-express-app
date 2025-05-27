import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';

export class CreateEmployeeUseCase {
  private employeeRepository: IEmployeeRepository;

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(employee: Employee): Promise<Employee> {
    return await this.employeeRepository.create(employee);
  }
}
