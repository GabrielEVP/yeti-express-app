import { ClientAddress } from '@/views/clients/domain/';

export class ClientAddressApiAdapter {
  public id: string;
  public address: string;

  constructor(id: string, address: string) {
    this.id = id;
    this.address = address;
  }

  static fromApi(apiData: any): ClientAddress | null {
    if (!apiData) return null;

    return new ClientAddress(apiData.id ?? '', apiData.address ?? '');
  }

  static toApi(clientAddress: ClientAddress): any {
    if (!clientAddress) return null;

    return {
      address: clientAddress.getAddress(),
    };
  }
}
