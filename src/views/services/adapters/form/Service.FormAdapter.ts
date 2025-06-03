import { Service } from '@views/services/';
import { Bill } from '@/views/services/';

export function mapFormToService(form: any): Service {
  const bills: Bill[] = (form.bills ?? []).map(
    (bill: any) => new Bill(bill.id ?? '', bill.name ?? '', Number(bill.amount ?? 0))
  );

  return new Service(
    form.id ?? '',
    form.name,
    form.description,
    Number(form.amount),
    Number(form.comision),
    Boolean(form.active),
    form.createdAt ? new Date(form.createdAt) : new Date(),
    form.updatedAt ? new Date(form.updatedAt) : new Date(),
    bills
  );
}
