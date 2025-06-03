import { ClientEmail } from '@/views/clients/domain/';

export class ClientEmailApiAdapter extends ClientEmail {
  static fromApi(apiData: any): ClientEmail {
    return new ClientEmailApiAdapter(apiData.id, apiData.email);
  }

  static toApi(clientEmail: ClientEmail): any {
    return {
      id: clientEmail.getId(),
      address: clientEmail.getEmail(),
    };
  }
}
