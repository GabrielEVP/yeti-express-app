import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export class GetCompanyBillByIdUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(id: string): Promise<CompanyBill | null> {
    return await this.repository.getById(id);
  }
}
