import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export class SearchCompanyBillsUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(query: string): Promise<CompanyBill[]> {
    return await this.repository.search(query);
  }
}
