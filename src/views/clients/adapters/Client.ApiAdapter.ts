import { Client, ClientEvent } from "@/views/clients/";
import { adaptAddress, adaptEmail, adaptPhone, adaptBankAccount, adaptAddressForApi, adaptEmailForApi, adaptPhoneForApi, adaptBankAccountForApi } from "@/adapters/";

export function adaptClient(apiData: any): Client {
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
      events: Array.isArray(apiData.events) ? apiData.events.map(adaptClientEvent) : [],
      addresses: Array.isArray(apiData.addresses) ? apiData.addresses.map(adaptAddress) : [],
      emails: Array.isArray(apiData.emails) ? apiData.emails.map(adaptEmail) : [],
      phones: Array.isArray(apiData.phones) ? apiData.phones.map(adaptPhone) : [],
      bankAccounts: Array.isArray(apiData.bank_accounts) ? apiData.bank_accounts.map(adaptBankAccount) : [],
   };
}

export function adaptClientEvent(apiData: any): ClientEvent {
   return {
      id: apiData.id,
      event: apiData.event,
      referenceTable: apiData.reference_table,
      referenceId: apiData.reference_id,
      clientId: apiData.client_id,
      createdAt: apiData.created_at,
   };
}

export function adaptClientForApi(client: Client): any {
   return {
      id: client.id,
      registration_number: client.registrationNumber,
      legal_name: client.legalName,
      type: client.type,
      website: client.website,
      country: client.country,
      currency: client.currency,
      tax_rate: client.taxRate,
      discount: client.discount,
      notes: client.notes,
      user_id: client.userId,
      created_at: client.createdAt,
      updated_at: client.updatedAt,
      events: Array.isArray(client.events) ? client.events.map(adaptClientEventforApi) : [],
      addresses: Array.isArray(client.addresses) ? client.addresses.map(adaptAddressForApi) : [],
      emails: Array.isArray(client.emails) ? client.emails.map(adaptEmailForApi) : [],
      phones: Array.isArray(client.phones) ? client.phones.map(adaptPhoneForApi) : [],
      bank_accounts: Array.isArray(client.bankAccounts) ? client.bankAccounts.map(adaptBankAccountForApi) : [],
   };
}

export function adaptClientEventforApi(ClientEvent: ClientEvent): any {
   return {
      id: ClientEvent.id,
      event: ClientEvent.event,
      reference_table: ClientEvent.referenceTable,
      reference_id: ClientEvent.referenceId,
      client_id: ClientEvent.clientId,
      created_at: ClientEvent.createdAt,
   };
}
