import { Event } from '@/models/';

export interface Client {
  id: string;
  legalName: string;
  type:
    | 'venezolano'
    | 'foreing'
    | 'legal'
    | 'commune'
    | 'government'
    | 'pasaport'
    | 'personal_signature';
  registrationNumber: string;
  notes: string;
  events: ClientEvent[];
  addresses: ClientAddress[];
  emails: ClientEmail[];
  phones: ClientPhone[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientEvent extends Event {
  clientId: string;
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
  name: string;
  phone: string;
}
