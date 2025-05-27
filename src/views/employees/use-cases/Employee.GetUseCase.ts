import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';

export class GetEmployeesUseCase {
  private employeeRepository: IEmployeeRepository;

  constructor(employeeRepository: IEmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async execute(): Promise<Employee[]> {
    return await this.employeeRepository.getAll();
  }
}
