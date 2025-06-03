import { ClientPhone } from '@/views/clients/domain/';

export class ClientPhoneApiAdapter extends ClientPhone {
  static fromApi(apiData: any): ClientPhone {
    return new ClientPhoneApiAdapter(apiData.id, apiData.phone);
  }

  static toApi(clientPhone: ClientPhone): any {
    return {
      id: clientPhone.getId(),
      address: clientPhone.getPhone(),
    };
  }
}
