import { ClientEmail } from '@/views/clients/domain/ClientEmail';

export class ClientEmailFormAdapter extends ClientEmail {
  static fromForm(form: any): ClientEmail {
    return new ClientEmail(form.id ?? '', form.email);
  }

  static toForm(email: ClientEmail): any {
    return {
      id: email.getId(),
      email: email.getEmail(),
    };
  }
}
