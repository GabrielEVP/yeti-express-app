import { Client } from '@/views/clients/domain/Client';
import { ClientTimeLine } from '@/views/clients/domain/ClientTimeLine';
import { ClientAddress } from '@/views/clients/domain/ClientAddress';
import { ClientEmail } from '@/views/clients/domain/ClientEmail';
import { ClientPhone } from '@/views/clients/domain/ClientPhone';
import { ClientType } from '@/views/clients/domain/Type';
import { adaptEvents } from '@/adapters/';

export function adaptClient(apiData: any): Client {
  const events = Array.isArray(apiData.events) ? apiData.events.map(adaptClientEvent) : [];
  const addresses = Array.isArray(apiData.addresses)
    ? apiData.addresses.map(adaptClientAddress)
    : [];
  const emails = Array.isArray(apiData.emails) ? apiData.emails.map(adaptClientEmail) : [];
  const phones = Array.isArray(apiData.phones) ? apiData.phones.map(adaptClientPhone) : [];

  return new Client(
    apiData.id,
    apiData.legal_name,
    apiData.type as ClientType.VENEZOLANO,
    apiData.registration_number,
    apiData.notes ?? '',
    events,
    addresses,
    emails,
    phones,
    [],
    new Date(apiData.created_at),
    new Date(apiData.updated_at)
  );
}

export function adaptClientForApi(client: Client): any {
  return {
    legal_name: client.getLegalName(),
    type: client.getType(),
    registration_number: client.getRegistrationNumber(),
    notes: client.getNotes(),
    deliveries: client.getDeliveries(),
    created_at: client.getCreatedAt().toISOString(),
    updated_at: client.getUpdatedAt().toISOString(),
  };
}

function adaptClientEvent(apiEvent: any): ClientTimeLine {
  const eventData = adaptEvents(apiEvent);
  return new ClientTimeLine(
    eventData.id,
    eventData.event,
    eventData.section,
    eventData.referenceTable,
    eventData.referenceId,
    eventData.createdAt
  );
}

export function adaptClientAddress(apiAddress: any): ClientAddress {
  return new ClientAddress(apiAddress.id, apiAddress.address);
}

function adaptClientEmail(apiEmail: any): ClientEmail {
  return new ClientEmail(apiEmail.id, apiEmail.email);
}

function adaptClientPhone(apiPhone: any): ClientPhone {
  return new ClientPhone(apiPhone.id, apiPhone.phone);
}
