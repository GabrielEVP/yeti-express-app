import type { IEmployeeRepository } from '@/views/employees/domain/IEmployeeRepository';

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
