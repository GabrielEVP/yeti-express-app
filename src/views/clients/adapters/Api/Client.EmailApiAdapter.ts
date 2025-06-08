import { ClientEmail } from '@/views/clients/domain/';

export class ClientEmailApiAdapter {
  public id: string;
  public email: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(id: string, email: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromApi(apiData: any): ClientEmail | null {
    if (!apiData) return null;

    return new ClientEmail(apiData.id ?? '', apiData.email ?? '');
  }

  static toApi(clientEmail: ClientEmail): any {
    if (!clientEmail) return null;

    return {
      email: clientEmail.getEmail(),
    };
  }
}
