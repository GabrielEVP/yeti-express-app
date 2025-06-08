import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";

export class CreateCompanyBillUseCase {
  constructor(private repository: ICompanyBillRepository) {}

  async execute(bill: CompanyBill): Promise<CompanyBill> {
    return await this.repository.create(bill);
  }
}
