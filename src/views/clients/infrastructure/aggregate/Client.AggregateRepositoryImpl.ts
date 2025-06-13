import { IClientAggregateRepository } from '@/views/clients';
import { ClientAggregateApi } from '@/views/clients';
import { ClientAddress } from '@/views/clients';
import { ClientEmail } from '@/views/clients';
import { ClientPhone } from '@/views/clients';
import { Delivery } from '@/views/deliveries/domain';
import { Debt } from '@/views/debts/domain';
import { TimeLineContent } from '@/time-line-content/domain';
import { ClientAddressApiAdapter } from '@/views/clients';
import { ClientEmailApiAdapter } from '@/views/clients';
import { ClientPhoneApiAdapter } from '@/views/clients';
import { DeliveryApiAdapter } from '@/views/deliveries/adapters';
import { DebtApiAdapter } from '@/views/debts/adapter';
import { adaptTimeLineContent } from '@/time-line-content/adapter';

export class ClientAggregateRepositoryImpl implements IClientAggregateRepository {
  async getTimeLineContent(clientId: string): Promise<TimeLineContent[]> {
    const response = await ClientAggregateApi.getTimeLineContent(clientId);
    return response.map((item: any) => adaptTimeLineContent(item)).filter(Boolean);
  }

  async getAddresses(clientId: string): Promise<ClientAddress[]> {
    const response = await ClientAggregateApi.getAddresses(clientId);
    return response.map((item: ClientAddressApiAdapter) => ClientAddressApiAdapter.fromApi(item)).filter(Boolean);
  }

  async getEmails(clientId: string): Promise<ClientEmail[]> {
    const response = await ClientAggregateApi.getEmails(clientId);
    return response.map((item: ClientEmailApiAdapter) => ClientEmailApiAdapter.fromApi(item)).filter(Boolean);
  }

  async getPhones(clientId: string): Promise<ClientPhone[]> {
    const response = await ClientAggregateApi.getPhones(clientId);
    return response.map((item: ClientPhoneApiAdapter) => ClientPhoneApiAdapter.fromApi(item)).filter(Boolean);
  }

  async getDeliveries(clientId: string): Promise<Delivery[]> {
    const response = await ClientAggregateApi.getDeliveries(clientId);
    return response.map((item: DeliveryApiAdapter) => DeliveryApiAdapter.fromApi(item)).filter(Boolean);
  }

  async getDebts(clientId: string): Promise<Debt[]> {
    const response = await ClientAggregateApi.getDebts(clientId);
    return response.map((item: DebtApiAdapter) => DebtApiAdapter.fromApi(item)).filter(Boolean);
  }

  async getDebtReport(id: string): Promise<Blob> {
    return await ClientAggregateApi.getDebtReport(id);
  }

  async getTotalInvoiced(clientId: string): Promise<number> {
    return await ClientAggregateApi.getTotalInvoiced(clientId);
  }

  async getEarningsDelivery(clientId: string): Promise<number> {
    return await ClientAggregateApi.getEarningsDelivery(clientId);
  }

  async getPendingEarnings(clientId: string): Promise<number> {
    return await ClientAggregateApi.getPendingEarnings(clientId);
  }

  async getPendingEarningsCount(clientId: string): Promise<number> {
    return await ClientAggregateApi.getPendingEarningsCount(clientId);
  }

  async getEarningsDeliveryOfCurrentMonth(clientId: string): Promise<number> {
    return await ClientAggregateApi.getEarningsDeliveryOfCurrentMonth(clientId);
  }
}
