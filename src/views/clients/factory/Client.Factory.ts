import { Client } from '@/views/clients/domain/Client';
import { ClientType } from '@/views/clients/domain/Type';
import { ClientAddress } from '../domain';

export const createDefaultClient = (): Client => {
  return new Client(
    '',
    '',
    ClientType.VENEZOLANO,
    '',
    '',
    [],
    [],
    [],
    [],
    [],
    new Date(),
    new Date()
  );
};

export const createDefaultClientAddress = (): ClientAddress => {
  return new ClientAddress('', '');
};
