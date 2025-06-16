import { Client, ClientAddress, ClientEmail, ClientPhone } from '@/views/clients';

export const DEFAULT_CLIENT_ADDRESS: ClientAddress = {
  id: '',
  address: '',
  canDelete: true,
};

export const DEFAULT_CLIENT_PHONE: ClientPhone = {
  id: '',
  phone: '',
};

export const DEFAULT_CLIENT_EMAIL: ClientEmail = {
  id: '',
  email: '',
};

export const DEFAULT_CLIENT: Client = {
  id: '',
  legalName: '',
  type: 'venezolano',
  registrationNumber: '',
  notes: '',
  allowCredit: false,
  userId: '',
  createdAt: '',
  updatedAt: '',
  events: [],
  addresses: [DEFAULT_CLIENT_ADDRESS],
  emails: [],
  phones: [DEFAULT_CLIENT_PHONE],
};
