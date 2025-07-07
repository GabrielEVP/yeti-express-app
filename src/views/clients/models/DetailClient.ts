import { ClientType } from '@views/clients';

export interface DetailClient {
  id: string;
  legal_name: string;
  type: ClientType;
  registration_number: string;
  notes: string;
  allow_credit: boolean;
  created_at: string;
  updated_at: string;
  addresses: ClientAddress[];
  emails: ClientEmail[];
  phones: ClientPhone[];
}

export interface ClientAddress {
  address: string;
}

export interface ClientEmail {
  email: string;
}

export interface ClientPhone {
  phone: string;
}
