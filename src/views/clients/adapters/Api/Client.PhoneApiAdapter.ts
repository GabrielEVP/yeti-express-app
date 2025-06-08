import { ClientPhone } from '@/views/clients/domain/';

export class ClientPhoneApiAdapter {
  public id: string;
  public phone: string;

  constructor(id: string, phone: string) {
    this.id = id;
    this.phone = phone;
  }

  static fromApi(apiData: any): ClientPhone | null {
    if (!apiData) return null;

    return new ClientPhone(apiData.id ?? '', apiData.phone ?? '');
  }

  static toApi(clientPhone: ClientPhone): any {
    if (!clientPhone) return null;

    return {
      phone: clientPhone.getPhone(),
    };
  }
}
