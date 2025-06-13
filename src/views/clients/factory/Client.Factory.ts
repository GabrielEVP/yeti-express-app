import { Client, ClientAddress, ClientEmail, ClientPhone } from '@/views/clients';

export const createDefaultClient = (): Client => ({
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
  addresses: [],
  emails: [],
  phones: [],
});

export const createDefaultClientAddress = (): ClientAddress => ({
  id: '',
  address: '',
});

export const createDefaultClientPhone = (): ClientPhone => ({
  id: '',
  phone: '',
});

export const createDefaultClientEmail = (): ClientEmail => ({
  id: '',
  email: '',
});
