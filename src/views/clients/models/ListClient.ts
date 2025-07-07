import { ClientType } from '@views/clients';

export interface ListClient {
  id: string;
  legal_name: string;
  type: ClientType;
  registration_number: string;
  allow_credit: boolean;
  can_delete?: boolean;
}
