import { Service } from '@views/services/domain/service/Service';
import { BillApiAdapter } from '@/views/services/adapters/api/Service.BillApiAdapter';

export class ServiceApiAdapter {
  public id: string;
  public name: string;
  public description: string;
  public amount: number;
  public comision: number;
  public active: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public bills: BillApiAdapter[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    amount: number,
    comision: number,
    active: boolean,
    createdAt: Date,
    updatedAt: Date,
    bills: BillApiAdapter[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.comision = comision;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.bills = bills;
  }

  static fromApi(serviceApiAdapter: ServiceApiAdapter): Service {
    return new Service(
      serviceApiAdapter.id,
      serviceApiAdapter.name,
      serviceApiAdapter.description,
      serviceApiAdapter.amount,
      serviceApiAdapter.comision,
      serviceApiAdapter.active,
      new Date(serviceApiAdapter.createdAt),
      new Date(serviceApiAdapter.updatedAt),
      serviceApiAdapter.bills?.map(BillApiAdapter.fromApi) ?? []
    );
  }

  static toApi(service: Service): ServiceApiAdapter {
    return {
      id: service.getId(),
      name: service.getName(),
      description: service.getDescription(),
      amount: service.getAmount(),
      comision: service.getComision(),
      active: service.isActive(),
      createdAt: service.getCreatedAt(),
      updatedAt: service.getUpdatedAt(),
      bills: service.getBills().map(BillApiAdapter.toApi),
    };
  }
}
