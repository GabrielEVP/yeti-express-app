import { Client, ClientEvent, ClientAddress, ClientEmail, ClientPhone } from '@/views/clients/';
import { adaptEvents, adaptEventsForApi } from '@/adapters/';

export function adaptClient(apiData: any): Client {
  return {
    id: apiData.id,
    type: apiData.type,
    registrationNumber: apiData.registration_number,
    legalName: apiData.legal_name,
    notes: apiData.notes,
    userId: apiData.user_id,
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptClientEvent) : [],
    addresses: Array.isArray(apiData.addresses) ? apiData.addresses.map(adaptAddress) : [],
    emails: Array.isArray(apiData.emails) ? apiData.emails.map(adaptEmail) : [],
    phones: Array.isArray(apiData.phones) ? apiData.phones.map(adaptPhone) : [],
  };
}

export function adaptClientForApi(client: Client): any {
  return {
    id: client.id,
    registration_number: client.registrationNumber,
    type: client.type,
    legal_name: client.legalName,
    notes: client.notes,
    user_id: client.userId,
    created_at: client.createdAt,
    updated_at: client.updatedAt,
    events: Array.isArray(client.events) ? client.events.map(adaptClientEventForApi) : [],
    addresses: Array.isArray(client.addresses) ? client.addresses.map(adaptAddressForApi) : [],
    emails: Array.isArray(client.emails) ? client.emails.map(adaptEmailForApi) : [],
    phones: Array.isArray(client.phones) ? client.phones.map(adaptPhoneForApi) : [],
  };
}

export function adaptClientEvent(apiEvent: any): ClientEvent {
  return {
    ...adaptEvents(apiEvent),
    clientId: apiEvent.client_id,
  };
}

export function adaptClientEventForApi(event: ClientEvent): any {
  return {
    ...adaptEventsForApi(event),
    client_id: event.clientId,
  };
}

export function adaptAddress(apiAddress: any): ClientAddress {
  return {
    id: apiAddress.id,
    address: apiAddress.address,
  };
}

export function adaptAddressForApi(address: ClientAddress): any {
  return {
    id: address.id,
    address: address.address,
  };
}

export function adaptPhone(apiPhone: any): ClientPhone {
  return {
    id: apiPhone.id,
    name: apiPhone.name,
    phone: apiPhone.phone,
  };
}

export function adaptPhoneForApi(phone: ClientPhone): any {
  return {
    id: phone.id,
    name: phone.name,
    phone: phone.phone,
  };
}

export function adaptEmail(apiEmail: any): ClientEmail {
  return {
    id: apiEmail.id,
    email: apiEmail.email,
  };
}

export function adaptEmailForApi(email: ClientEmail): any {
  return {
    id: email.id,
    email: email.email,
  };
}
