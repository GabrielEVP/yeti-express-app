import { ClientAddress } from '@/views/clients/domain/ClientAddress';

export class ClientAddressApiAdapter extends ClientAddress {
  static fromApi(apiData: any): ClientAddress {
    return new ClientAddressApiAdapter(apiData.id, apiData.address);
  }

  static toApi(clientAddress: ClientAddress): any {
    return {
      id: clientAddress.getId(),
      address: clientAddress.getAddress(),
    };
  }
}
