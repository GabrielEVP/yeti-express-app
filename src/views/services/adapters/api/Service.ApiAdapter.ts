import { Service } from '@views/services/domain/service/Service';
import { BillApiAdapter } from '@/views/services/adapters/api/Service.BillApiAdapter';

export class ServiceApiAdapter {
  static fromApi(apiData: any): Service {
    return new Service(
      apiData.id,
      apiData.name,
      apiData.description,
      apiData.amount,
      apiData.comision,
      apiData.active,
      new Date(apiData.created_at),
      new Date(apiData.updated_at),
      apiData.bills?.map(BillApiAdapter.fromApi) ?? []
    );
  }

  static toApi(service: Service): any {
    return {
      id: service.getId(),
      name: service.getName(),
      description: service.getDescription(),
      amount: service.getAmount(),
      comision: service.getComision(),
      active: service.isActive(),
      bills: service.getBills().map(BillApiAdapter.toApi),
    };
  }
}
