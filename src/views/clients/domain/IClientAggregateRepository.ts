import { ClientAddress } from '@/views/clients';
import { ClientEmail } from '@/views/clients';
import { ClientPhone } from '@/views/clients';
import { TimeLineContent } from '@/time-line-content/domain';
import { Delivery } from '@/views/deliveries/domain';
import { Debt } from '@/views/debts/domain';

export interface IClientAggregateRepository {
  getTimeLineContent(clientId: string): Promise<TimeLineContent[]>;
  getAddresses(clientId: string): Promise<ClientAddress[]>;
  getEmails(clientId: string): Promise<ClientEmail[]>;
  getPhones(clientId: string): Promise<ClientPhone[]>;
  getDebts(clientId: string): Promise<Debt[]>;
  getDebtReport(id: string): Promise<Blob>;
  getTotalInvoiced(clientId: string): Promise<number>;
  getEarningsDelivery(clientId: string): Promise<number>;
  getPendingEarnings(clientId: string): Promise<number>;
  getPendingEarningsCount(clientId: string): Promise<number>;
  getEarningsDeliveryOfCurrentMonth(clientId: string): Promise<number>;
}
