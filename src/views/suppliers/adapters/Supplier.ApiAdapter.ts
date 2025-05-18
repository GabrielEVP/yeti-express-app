import { Supplier, SupplierEvent } from "@/views/suppliers/";
import { adaptAddress, adaptEmail, adaptPhone, adaptBankAccount, adaptAddressForApi, adaptEmailForApi, adaptPhoneForApi, adaptBankAccountForApi } from "@/adapters/";

export function adaptSupplier(apiData: any): Supplier {
   return {
      id: apiData.id,
      registrationNumber: apiData.registration_number,
      legalName: apiData.legal_name,
      type: apiData.type,
      website: apiData.website,
      country: apiData.country,
      currency: apiData.currency,
      taxRate: apiData.tax_rate,
      discount: apiData.discount,
      notes: apiData.notes,
      userId: apiData.user_id,
      createdAt: apiData.created_at,
      updatedAt: apiData.updated_at,
      events: Array.isArray(apiData.events) ? apiData.events.map(adaptSupplierEvent) : [],
      addresses: Array.isArray(apiData.addresses) ? apiData.addresses.map(adaptAddress) : [],
      emails: Array.isArray(apiData.emails) ? apiData.emails.map(adaptEmail) : [],
      phones: Array.isArray(apiData.phones) ? apiData.phones.map(adaptPhone) : [],
      bankAccounts: Array.isArray(apiData.bank_accounts) ? apiData.bank_accounts.map(adaptBankAccount) : [],
   };
}

export function adaptSupplierEvent(apiData: any): SupplierEvent {
   return {
      id: apiData.id,
      event: apiData.event,
      referenceTable: apiData.referenceTable,
      referenceId: apiData.reference_id,
      supplierId: apiData.supplier_id,
      createdAt: apiData.created_at,
   };
}

export function adaptSupplierForApi(supplier: Supplier): any {
   return {
      id: supplier.id,
      registration_number: supplier.registrationNumber,
      legal_name: supplier.legalName,
      type: supplier.type,
      website: supplier.website,
      country: supplier.country,
      currency: supplier.currency,
      tax_rate: supplier.taxRate,
      discount: supplier.discount,
      notes: supplier.notes,
      user_id: supplier.userId,
      created_at: supplier.createdAt,
      updated_at: supplier.updatedAt,
      events: Array.isArray(supplier.events) ? supplier.events.map(adaptSupplierEventForApi) : [],
      addresses: Array.isArray(supplier.addresses) ? supplier.addresses.map(adaptAddressForApi) : [],
      emails: Array.isArray(supplier.emails) ? supplier.emails.map(adaptEmailForApi) : [],
      phones: Array.isArray(supplier.phones) ? supplier.phones.map(adaptPhoneForApi) : [],
      bank_accounts: Array.isArray(supplier.bankAccounts) ? supplier.bankAccounts.map(adaptBankAccountForApi) : [],
   };
}

export function adaptSupplierEventForApi(supplierEvent: SupplierEvent): any {
   return {
      id: supplierEvent.id,
      event: supplierEvent.event,
      reference_table: supplierEvent.referenceTable,
      reference_id: supplierEvent.referenceId,
      supplier_id: supplierEvent.supplierId,
      created_at: supplierEvent.createdAt,
   };
}
