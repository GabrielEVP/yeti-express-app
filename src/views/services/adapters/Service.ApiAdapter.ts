import { Service } from '@/views/services/domain/Service';
import { Bill } from '@/views/services/domain/Bill';

export function adaptService(apiData: any): Service {
  const bills = Array.isArray(apiData.bills) ? apiData.bills.map(adaptBill) : [];

  return new Service(
    apiData.id,
    apiData.name,
    apiData.description,
    Number(apiData.amount),
    Number(apiData.comision),
    Boolean(apiData.active),
    new Date(apiData.created_at),
    new Date(apiData.updated_at),
    bills
  );
}

export function adaptServiceForApi(service: Service): any {
  return {
    id: service.getId(),
    name: service.getName(),
    description: service.getDescription(),
    amount: service.getAmount(),
    comision: service.getComision(),
    active: service.isActive(),
    createdAt: service.getCreatedAt().toISOString(),
    updatedAt: service.getUpdatedAt().toISOString(),
    bills: service.getBills().map(adaptBillForApi),
  };
}

export function adaptBill(apiBill: any): Bill {
  return new Bill(apiBill.id, apiBill.name, Number(apiBill.amount));
}

export function adaptBillForApi(bill: Bill): any {
  return {
    id: bill.getId(),
    name: bill.getName(),
    amount: bill.getAmount(),
  };
}
