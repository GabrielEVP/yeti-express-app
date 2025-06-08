import { ClientPhone } from '@/views/clients/domain/';

export class ClientPhoneFormAdapter extends ClientPhone {
  static fromForm(form: any): ClientPhone {
    return new ClientPhone(form.id ?? '', form.phone);
  }

  static toForm(phone: ClientPhone): any {
    return {
      id: phone.getId(),
      phone: phone.getPhone(),
    };
  }
}
