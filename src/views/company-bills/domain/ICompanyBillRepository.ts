import type { CompanyBill } from "./CompanyBill";

export interface ICompanyBillRepository {
  getAll(): Promise<CompanyBill[]>;
  getById(id: string): Promise<CompanyBill | null>;
  create(bill: CompanyBill): Promise<CompanyBill>;
  update(id: string, bill: CompanyBill): Promise<CompanyBill>;
  delete(id: string): Promise<void>;
  search(query: string): Promise<CompanyBill[]>;
}
