import { TimeLineContent } from '@time-line-content/domain';

export interface Client {
  id: string;
  legalName: string;
  type: 'venezolano' | 'foreing' | 'legal' | 'commune' | 'government' | 'pasaport' | 'personal_signature';
  registrationNumber: string;
  notes: string;
  allowCredit: boolean;
  events: TimeLineContent[];
  addresses: ClientAddress[];
  emails: ClientEmail[];
  phones: ClientPhone[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientAddress {
  id: string;
  address: string;
}

export interface ClientEmail {
  id: string;
  email: string;
}

export interface ClientPhone {
  id: string;
  phone: string;
}
