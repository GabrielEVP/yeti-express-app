import { Client } from '@/views/clients/domain/';
import { ClientType } from '@/views/clients/domain/';
import { ClientAddressFormAdapter } from './Client.AddressFormAdapter';
import { ClientEmailFormAdapter } from './Client.EmailFormAdapter';
import { ClientPhoneFormAdapter } from './Client.PhoneFormAdapter';
import { ClientDeliveryDebtFormAdapter } from './Client.DeliveryDebtFormAdapter';

export class ClientFormAdapter {
  static fromForm(form: any): Client {
    return new Client(
      form.id ?? '',
      form.legalName,
      form.type as ClientType.VENEZOLANO,
      form.registrationNumber,
      form.notes ?? '',
      form.allow_credit,
      [],
      (form.addresses ?? []).map(ClientAddressFormAdapter.fromForm),
      (form.emails ?? []).map(ClientEmailFormAdapter.fromForm),
      (form.phones ?? []).map(ClientPhoneFormAdapter.fromForm),
      [],
      (form.delivery_debts ?? []).map((debt: any) => ClientDeliveryDebtFormAdapter.fromForm(debt, undefined)),
      new Date(),
      new Date()
    );
  }

  static toForm(client: Client): any {
    return {
      id: client.getId(),
      legalName: client.getLegalName(),
      type: client.getType(),
      registrationNumber: client.getRegistrationNumber(),
      notes: client.getNotes(),
      allow_credit: client.getAllowCredit(),
      addresses: client.getAddresses(),
      emails: client.getEmails(),
      phones: client.getPhones(),
      delivery_debts: client.getDeliveryDebt().map(debt => ClientDeliveryDebtFormAdapter.toForm(debt)),
    };
  }
}
