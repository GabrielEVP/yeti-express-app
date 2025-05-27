import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';
import type { Employee } from '@/views/employees/domain/Employee';

export class SearchEmployeesUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(query: string): Promise<Employee[]> {
    if (!this.employeeRepository.search) {
      throw new Error('Search method is not implemented in the repository');
    }
    return await this.employeeRepository.search(query);
  }
}
