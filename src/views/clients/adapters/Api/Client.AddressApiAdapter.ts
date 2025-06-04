import { ClientAddress } from '@/views/clients/domain/';

export class ClientAddressApiAdapter {
  public id: string;
  public address: string;

  constructor(id: string, address: string) {
    this.id = id;
    this.address = address;
  }

  static fromApi(clientAddressApiAdapter: ClientAddressApiAdapter): ClientAddress {
    return new ClientAddress(clientAddressApiAdapter.id, clientAddressApiAdapter.address);
  }

  static toApi(clientAddress: ClientAddress): ClientAddressApiAdapter {
    return new ClientAddressApiAdapter(clientAddress.getId(), clientAddress.getAddress());
  }
}
