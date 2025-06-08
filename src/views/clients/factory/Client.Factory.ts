import { Client, ClientPhone } from '@/views/clients/domain/';
import { ClientType } from '@/views/clients/domain/';
import { ClientAddress } from '../domain';

export const createDefaultClient = (): Client => {
  return new Client(
    '',
    '',
    ClientType.VENEZOLANO,
    '',
    '',
    false,
    [],
    [createDefaultClientAddress()],
    [],
    [new ClientPhone('', '')],
    [],
    [],
    new Date(),
    new Date()
  );
};

export const createDefaultClientAddress = (): ClientAddress => {
  return new ClientAddress('', '');
};
