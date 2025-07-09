import { ClientType, FormClient, FormClientAddress, FormClientEmail, FormClientPhone } from '@/views/clients/models';

export const DEFAULT_CLIENT_ADDRESS: FormClientAddress = {
  id: '',
  address: '',
};

export const DEFAULT_CLIENT_PHONE: FormClientPhone = {
  id: '',
  phone: '',
};

export const DEFAULT_CLIENT_EMAIL: FormClientEmail = {
  id: '',
  email: '',
};

export const DEFAULT_CLIENT: FormClient = {
  id: '',
  legal_name: '',
  type: ClientType.VENEZOLANO,
  registration_number: '',
  notes: '',
  allow_credit: 1,
  addresses: [DEFAULT_CLIENT_ADDRESS],
  emails: [],
  phones: [DEFAULT_CLIENT_PHONE],
};
