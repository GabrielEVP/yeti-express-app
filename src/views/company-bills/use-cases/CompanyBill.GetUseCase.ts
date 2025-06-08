import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export class GetCompanyBillsUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(): Promise<CompanyBill[]> {
    return await this.repository.getAll();
  }
}
