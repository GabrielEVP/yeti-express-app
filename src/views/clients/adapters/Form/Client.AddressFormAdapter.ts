import { ClientAddress } from '@/views/clients/domain/ClientAddress';

export class ClientAddressFormAdapter extends ClientAddress {
  static fromForm(form: any): ClientAddress {
    return new ClientAddress(form.id ?? '', form.address);
  }

  static toForm(address: ClientAddress): any {
    return {
      id: address.getId(),
      address: address.getAddress(),
    };
  }
}
