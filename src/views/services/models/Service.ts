import { TimeLineContent } from '@time-line-content';

export interface Service {
  id: string;
  name: string;
  description: string;
  amount: number;
  events: TimeLineContent[];
  comision: number;
  bills: Bill[];
  createdAt: string;
  updatedAt: string;
  totalExpense?: number;
  totalEarning?: number;
  canDelete?: boolean;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
}
