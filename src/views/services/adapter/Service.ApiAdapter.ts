import { Service, Bill } from '@/views/services';
import { adaptTimeLineContent } from '@/time-line-content/adapter';

export function adaptService(apiData: any = {}): Service {
  return {
    id: apiData.id ?? '',
    name: apiData.name ?? '',
    description: apiData.description ?? '',
    amount: apiData.amount ?? 0,
    comision: apiData.comision ?? 0,
    createdAt: apiData.created_at ?? '',
    updatedAt: apiData.updated_at ?? '',
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    bills: Array.isArray(apiData.bills) ? apiData.bills.map(adaptBill) : [],
  };
}

export function adaptServiceForApi(service: Service): any {
  return {
    id: service.id ?? '',
    name: service.name ?? '',
    description: service.description ?? '',
    amount: service.amount ?? 0,
    comision: service.comision ?? 0,
    bills: Array.isArray(service.bills) ? service.bills.map(adaptBillForApi) : [],
  };
}

export function adaptBill(apiBill: any = {}): Bill {
  return {
    id: apiBill.id ?? '',
    name: apiBill.name ?? '',
    amount: apiBill.amount ?? 0,
  };
}

export function adaptBillForApi(bill: Bill): any {
  return {
    id: bill.id ?? '',
    name: bill.name ?? '',
    amount: bill.amount ?? 0,
  };
}
