import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';

export class GetEmployeeByIdUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<Employee | null> {
    return await this.employeeRepository.getById(id);
  }
}
