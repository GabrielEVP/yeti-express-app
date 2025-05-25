import { Client, ClientAddress, ClientEmail, ClientPhone } from '@views/clients';

export const EMAILDEFAULTFORMVALUES: ClientEmail = {
  id: '',
  email: '',
} as const;

export const ADDRESSDEFAULTFORMVALUE: ClientAddress = {
  id: '',
  address: '',
};

export const PHONEDEFAULTFORMVALUE: ClientPhone = {
  id: '',
  name: '',
  phone: '',
};

export const DEFAULTCLIENTFORMVALUE: Client = {
  id: '',
  type: 'venezolano',
  registrationNumber: '',
  legalName: '',
  notes: '',
  userId: '',
  createdAt: '',
  updatedAt: '',
  events: [],
  addresses: [],
  emails: [],
  phones: [],
};

export const DEFAULTBASICCLIENTFORMVALUE: Client = {
  id: '',
  registrationNumber: '',
  type: 'venezolano',
  legalName: '',
  notes: '',
  userId: '',
  createdAt: '',
  updatedAt: '',
  events: [],
  addresses: [ADDRESSDEFAULTFORMVALUE],
  emails: [],
  phones: [],
};
