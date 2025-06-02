import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";

export class DeleteCompanyBillUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
