import { Client, ClientAddress, ClientEmail, ClientPhone } from '@/views/clients/';
import { adaptTimeLineContent } from '@/time-line-content/adapter';

export function adaptClient(apiData: any = {}): Client {
  const baseClient: Client = {
    id: apiData.id ?? '',
    type: apiData.type ?? 'venezolano',
    registrationNumber: apiData.registration_number ?? '',
    legalName: apiData.legal_name ?? '',
    notes: apiData.notes ?? '',
    allowCredit: apiData.allow_credit ?? '0',
    userId: apiData.user_id ?? '',
    createdAt: apiData.created_at ?? '',
    updatedAt: apiData.updated_at ?? '',
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    addresses: Array.isArray(apiData.addresses) ? apiData.addresses.map(adaptAddress) : [],
    emails: Array.isArray(apiData.emails) ? apiData.emails.map(adaptEmail) : [],
    phones: Array.isArray(apiData.phones) ? apiData.phones.map(adaptPhone) : [],
  };

  if (apiData.debts_count !== undefined && apiData.debts_count !== null) {
    baseClient.debtsCount = Number(apiData.debts_count);
  }

  const allowedOptionalFields = ['some_future_field', 'another_field'];
  allowedOptionalFields.forEach((field) => {
    if (apiData[field] !== undefined) {
      baseClient[field] = apiData[field];
    }
  });

  return baseClient;
}

export function adaptClientForApi(client: Client): any {
  return {
    id: client.id ?? null,
    registration_number: client.registrationNumber ?? null,
    type: client.type ?? null,
    legal_name: client.legalName ?? null,
    notes: client.notes ?? null,
    allow_credit: client.allowCredit ?? false,
    user_id: client.userId ?? null,
    created_at: client.createdAt ?? null,
    updated_at: client.updatedAt ?? null,
    addresses: Array.isArray(client.addresses) ? client.addresses.map(adaptAddressForApi) : [],
    emails: Array.isArray(client.emails) ? client.emails.map(adaptEmailForApi) : [],
    phones: Array.isArray(client.phones) ? client.phones.map(adaptPhoneForApi) : [],
  };
}

export function adaptAddress(apiAddress: any = {}): ClientAddress {
  return {
    id: apiAddress.id ?? '',
    address: apiAddress.address ?? '',
  };
}

export function adaptAddressForApi(address: ClientAddress): any {
  return {
    id: address.id ?? null,
    address: address.address ?? null,
  };
}

export function adaptPhone(apiPhone: any = {}): ClientPhone {
  return {
    id: apiPhone.id ?? '',
    phone: apiPhone.phone ?? '',
  };
}

export function adaptPhoneForApi(phone: ClientPhone): any {
  return {
    id: phone.id ?? null,
    phone: phone.phone ?? null,
  };
}

export function adaptEmail(apiEmail: any = {}): ClientEmail {
  return {
    id: apiEmail.id ?? '',
    email: apiEmail.email ?? '',
  };
}

export function adaptEmailForApi(email: ClientEmail): any {
  return {
    id: email.id ?? null,
    email: email.email ?? null,
  };
}
