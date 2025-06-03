import { Service } from '@views/services/';
import { BillFormAdapter } from '@/views/services/adapters/form/';

export class ServiceFormAdapter {
  static fromForm(form: any): Service {
    return new Service(
      form.id,
      form.name,
      form.description,
      form.amount,
      form.comision,
      form.active,
      new Date(form.created_at),
      new Date(form.updated_at),
      form.bills?.map(BillFormAdapter.fromForm) ?? []
    );
  }

  static toForm(service: Service): any {
    return {
      id: service.getId(),
      name: service.getName(),
      description: service.getDescription(),
      amount: service.getAmount(),
      comision: service.getComision(),
      active: service.isActive(),
      bills: service.getBills().map(BillFormAdapter.toForm),
    };
  }
}
