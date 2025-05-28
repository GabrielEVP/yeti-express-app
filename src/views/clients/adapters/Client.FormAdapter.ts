import { Client } from '@/views/clients/domain/Client';
import { ClientType } from '@/views/clients/domain/Type';
import { ClientAddress } from '@/views/clients/domain/ClientAddress';
import { ClientEmail } from '@/views/clients/domain/ClientEmail';
import { ClientPhone } from '@/views/clients/domain/ClientPhone';

export function mapFormToClient(form: any): Client {
  const addresses: ClientAddress[] = (form.addresses ?? []).map(
    (addr: any) => new ClientAddress(addr.id ?? '', addr.address ?? '')
  );

  const emails: ClientEmail[] = (form.emails ?? []).map(
    (email: any) => new ClientEmail(email.id ?? '', email.email ?? '')
  );

  const phones: ClientPhone[] = (form.phones ?? []).map(
    (phone: any) => new ClientPhone(phone.id ?? '', phone.phone ?? '')
  );

  return new Client(
    form.id ?? '',
    form.legalName,
    form.type as ClientType.VENEZOLANO,
    form.registrationNumber,
    form.notes ?? '',
    [],
    addresses,
    emails,
    phones,
    [],
    new Date(),
    new Date()
  );
}

export function mapFormToAddress(form: any): ClientAddress {
  return new ClientAddress(form.id ?? '', form.address);
}
