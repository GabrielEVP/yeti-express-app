import { Client } from '@/views/clients/domain/';
import { ClientAddressApiAdapter } from '@/views/clients/adapters/Api/Client.AddressApiAdapter';
import { ClientEmailApiAdapter } from '@/views/clients/adapters/Api/Client.EmailApiAdapter';
import { ClientPhoneApiAdapter } from '@/views/clients/adapters/Api/Client.PhoneApiAdapter';
import { adaptTimeLineContent } from '@/time-line-content/adapter';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters/api/';
import { DebtApiAdapter } from '@/views/debts/adapter/';
import { TimeLineContent } from '@time-line-content/domain';
import { Delivery } from '@/views/deliveries/domain/Delivery';
import { Debt } from '@/views/debts/domain/Debt';

export class ClientApiAdapter {
  public id: string;
  public legal_name: string;
  public type: string;
  public registration_number: string;
  public notes: string;
  public allow_credit: boolean;
  public events: TimeLineContent[];
  public addresses: ClientAddressApiAdapter[];
  public emails: ClientEmailApiAdapter[];
  public phones: ClientPhoneApiAdapter[];
  public deliveries: Delivery[];
  public debts: Debt[];
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    legal_name: string,
    type: string,
    registration_number: string,
    notes: string,
    allow_credit: boolean,
    events: TimeLineContent[],
    addresses: ClientAddressApiAdapter[],
    emails: ClientEmailApiAdapter[],
    phones: ClientPhoneApiAdapter[],
    deliveries: Delivery[],
    debts: Debt[],
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.legal_name = legal_name;
    this.type = type;
    this.registration_number = registration_number;
    this.notes = notes;
    this.allow_credit = allow_credit;
    this.events = events;
    this.addresses = addresses;
    this.emails = emails;
    this.phones = phones;
    this.deliveries = deliveries;
    this.debts = debts;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromApi(apiData: any): Client | null {
    if (!apiData) return null;

    return new Client(
      apiData.id ?? '',
      apiData.legal_name ?? '',
      apiData.type ?? '',
      apiData.registration_number ?? '',
      apiData.notes ?? '',
      apiData.allow_credit ?? false,
      apiData.events?.map(adaptTimeLineContent) ?? [],
      apiData.addresses?.map(ClientAddressApiAdapter.fromApi) ?? [],
      apiData.emails?.map(ClientEmailApiAdapter.fromApi) ?? [],
      apiData.phones?.map(ClientPhoneApiAdapter.fromApi) ?? [],
      apiData.deliveries?.map(DeliveryApiAdapter.fromApiToClient) ?? [],
      apiData.debts?.map(DebtApiAdapter.fromApi) ?? [],
      apiData.created_at ? new Date(apiData.created_at) : new Date(),
      apiData.updated_at ? new Date(apiData.updated_at) : new Date()
    );
  }

  static toApi(client: Client): any {
    if (!client) return null;

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

  static fromApiToDelivery(apiData: any): Client | null {
    if (!apiData) return null;

    return new Client(
      apiData.id ?? '',
      apiData.legal_name ?? '',
      apiData.type ?? '',
      apiData.registration_number ?? '',
      apiData.notes ?? '',
      apiData.allow_credit ?? false,
      [],
      apiData.addresses?.map(ClientAddressApiAdapter.fromApi) ?? [],
      [],
      [],
      [],
      [],
      apiData.created_at ? new Date(apiData.created_at) : new Date(),
      apiData.updated_at ? new Date(apiData.updated_at) : new Date()
    );
  }
}
