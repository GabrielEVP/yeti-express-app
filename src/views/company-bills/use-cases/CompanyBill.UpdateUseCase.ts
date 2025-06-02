import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export class UpdateCompanyBillUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(id: string, bill: CompanyBill): Promise<CompanyBill> {
    return await this.repository.update(id, bill);
  }
}
