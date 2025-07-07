import { TimeLineContent } from '@time-line-content';
import { ClientType } from '@views/clients';

export interface Client {
  id: string;
  legalName: string;
  type: ClientType;
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
  totalDebtAmount?: number;
  debtsCount?: number;
  canDelete?: boolean;
  hasHadDebt?: boolean;
  [key: string]: any;
}

export interface ClientAddress {
  id: string;
  address: string;
  canDelete: boolean;
}

export interface ClientEmail {
  id: string;
  email: string;
}

export interface ClientPhone {
  id: string;
  phone: string;
}

export interface Stast {
  total_deliveries_with_debt: number;
  total_pending: number;
}
