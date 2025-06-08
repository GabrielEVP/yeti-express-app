import type { ICompanyBillRepository } from "@/views/company-bills/domain/ICompanyBillRepository";
import type { CompanyBill } from "@/views/company-bills/domain/CompanyBill";
import { CompanyBillApi } from "@views/company-bills/infrastructure/CompanyBill.Api";
import { CompanyBillApiAdapter } from "@/views/company-bills/adapters/Api/CompanyBill.ApiAdapter";

export class CompanyBillRepositoryImpl implements ICompanyBillRepository {
  async getAll(): Promise<CompanyBill[]> {
    const response = await CompanyBillApi.getAll();
    return response.map(CompanyBillApiAdapter.fromApi);
  }

  async getById(id: string): Promise<CompanyBill | null> {
    try {
      const response = await CompanyBillApi.getById(id);
      return CompanyBillApiAdapter.fromApi(response);
    } catch (error) {
      return null;
    }
  }

  async create(bill: CompanyBill): Promise<CompanyBill> {
    const payload = CompanyBillApiAdapter.toApi(bill);
    const response = await CompanyBillApi.create(payload);
    return CompanyBillApiAdapter.fromApi(response);
  }

  async update(id: string, bill: CompanyBill): Promise<CompanyBill> {
    const payload = CompanyBillApiAdapter.toApi(bill);
    const response = await CompanyBillApi.update(id, payload);
    return CompanyBillApiAdapter.fromApi(response);
  }

  async delete(id: string): Promise<void> {
    await CompanyBillApi.delete(id);
  }

  async search(query: string): Promise<CompanyBill[]> {
    const response = await CompanyBillApi.search(query);
    return response.map(CompanyBillApiAdapter.fromApi);
  }
}
