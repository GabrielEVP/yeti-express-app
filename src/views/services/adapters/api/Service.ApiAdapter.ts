import { Service } from '@views/services/domain/service/Service';
import { BillApiAdapter } from '@/views/services/adapters/api/Service.BillApiAdapter';
import { adaptTimeLineContent } from '@time-line-content/adapter';

export class ServiceApiAdapter {
  public id: string;
  public name: string;
  public description: string;
  public amount: number;
  public comision: number;
  public active: boolean;
  public events: any[];
  public created_at: Date;
  public updated_at: Date;
  public bills: BillApiAdapter[] = [];

  constructor(
    id: string,
    name: string,
    description: string,
    amount: number,
    comision: number,
    active: boolean,
    events: any[],
    created_at: Date,
    updated_at: Date,
    bills: BillApiAdapter[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.comision = comision;
    this.active = active;
    this.events = events;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.bills = bills;
  }

  static fromApi(serviceApiAdapter: Partial<ServiceApiAdapter>): Service {
    return new Service(
      serviceApiAdapter.id ?? '',
      serviceApiAdapter.name ?? '',
      serviceApiAdapter.description ?? '',
      serviceApiAdapter.amount ?? 0,
      serviceApiAdapter.comision ?? 0,
      serviceApiAdapter.active ?? true,
      serviceApiAdapter.events?.map(adaptTimeLineContent) ?? [],
      new Date(serviceApiAdapter.created_at ?? new Date()),
      new Date(serviceApiAdapter.updated_at ?? new Date()),
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
      events: service.getTimeLineContent(),
      created_at: service.getCreatedAt(),
      updated_at: service.getUpdatedAt(),
      bills: service.getBills().map(BillApiAdapter.toApi),
    };
  }
}
