import { ClientType } from '@views/clients';

export interface FormClient {
  id: string;
  legal_name: string;
  type: ClientType;
  registration_number: string;
  notes: string;
  allow_credit: boolean;
  addresses: FormClientAddress[];
  emails: FormClientEmail[];
  phones: FormClientPhone[];
}

export interface FormClientAddress {
  id: string;
  address: string;
}

export interface FormClientEmail {
  id: string;
  email: string;
}

export interface FormClientPhone {
  id: string;
  phone: string;
}
