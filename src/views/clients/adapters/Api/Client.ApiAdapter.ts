import { Client } from '@/views/clients/domain/';
import { ClientAddressApiAdapter } from '@/views/clients/adapters/Api/Client.AddressApiAdapter';
import { ClientEmailApiAdapter } from '@/views/clients/adapters/Api/Client.EmailApiAdapter';
import { ClientPhoneApiAdapter } from '@/views/clients/adapters/Api/Client.PhoneApiAdapter';
import { adaptTimeLineContent } from '@/time-line-content/adapter';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters/api/';
import { DebtApiAdapter } from '@/views/debts/adapter/';

export class ClientApiAdapter extends Client {
  static fromApi(apiData: any): Client {
    return new Client(
      apiData.id,
      apiData.legal_name,
      apiData.type,
      apiData.registration_number,
      apiData.notes,
      apiData.allow_credit,
      apiData.events?.map(adaptTimeLineContent) ?? [],
      apiData.addresses?.map(ClientAddressApiAdapter.fromApi) ?? [],
      apiData.emails?.map(ClientEmailApiAdapter.fromApi) ?? [],
      apiData.phones?.map(ClientPhoneApiAdapter.fromApi) ?? [],
      apiData.deliveries?.map(DeliveryApiAdapter.fromApiToClient) ?? [],
      apiData.debts?.map(DebtApiAdapter.fromApi) ?? [],
      new Date(apiData.created_at),
      new Date(apiData.updated_at)
    );
  }

  static toApi(client: Client): any {
    return {
      legal_name: client.getLegalName(),
      type: client.getType(),
      registration_number: client.getRegistrationNumber(),
      notes: client.getNotes(),
      allow_credit: client.getAllowCredit(),
      addresses: client.getAddresses(),
      emails: client.getEmails(),
      phones: client.getPhones(),
    };
  }

  static fromApiToDelivery(apiData: any): Client {
    return new Client(
      apiData.id,
      apiData.legal_name,
      apiData.type,
      apiData.registration_number,
      apiData.notes,
      apiData.allow_credit,
      [],
      apiData.addresses?.map(ClientAddressApiAdapter.fromApi) ?? [],
      [],
      [],
      [],
      [],
      new Date(apiData.created_at),
      new Date(apiData.updated_at)
    );
  }
}
