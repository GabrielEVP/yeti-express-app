import { Service, Bill } from '@/views/services';

export function adaptService(apiData: any): Service {
  return {
    name: apiData.name,
    description: apiData.description,
    amount: apiData.amount,
    comision: apiData.comision,
    bills: Array.isArray(apiData.bills) ? apiData.bills.map(adaptBill) : [],
  };
}

export function adaptServiceForApi(service: Service): any {
  return {
    name: service.name,
    description: service.description,
    amount: service.amount,
    comision: service.comision,
    bills: service.bills.map(adaptBillForApi),
  };
}

export function adaptBill(apiBill: any): Bill {
  return {
    name: apiBill.name,
    amount: apiBill.amount,
  };
}

export function adaptBillForApi(bill: Bill): any {
  return {
    name: bill.name,
    amount: bill.amount,
  };
}
