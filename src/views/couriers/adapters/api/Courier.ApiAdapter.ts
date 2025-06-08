import { Courier } from '@/views/couriers';
import { Delivery } from '@/views/deliveries';
import { adaptTimeLineContent } from '@time-line-content/adapter';
import { DeliveryApiAdapter } from '@views/deliveries';

export class CourierApiAdapter {
  public id: string;
  public first_name: string;
  public last_name: string;
  public phone: string;
  public active: boolean;
  public events: any[];
  public deliveries: DeliveryApiAdapter[] = [];
  public created_at: Date;
  public updated_at: Date;

  constructor(
    id: string,
    first_name: string,
    last_name: string,
    phone: string,
    active: boolean,
    events: any[],
    deliveries: DeliveryApiAdapter[],
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.phone = phone;
    this.active = active;
    this.events = events;
    this.deliveries = deliveries;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static fromApi(courierApiAdapter: CourierApiAdapter): Courier {
    return new Courier(
      courierApiAdapter.id,
      courierApiAdapter.first_name,
      courierApiAdapter.last_name,
      courierApiAdapter.phone,
      courierApiAdapter.active,
      courierApiAdapter.events?.map(adaptTimeLineContent) ?? [],
      courierApiAdapter.deliveries
        ?.map(DeliveryApiAdapter.fromApiToCourier)
        .filter((d): d is Delivery => d !== null) ?? [],
      new Date(courierApiAdapter.created_at),
      new Date(courierApiAdapter.updated_at)
    );
  }

  static toApi(courier: Courier): CourierApiAdapter {
    return new CourierApiAdapter(
      courier.getId(),
      courier.getFirstName(),
      courier.getLastName(),
      courier.getPhone(),
      courier.isActive(),
      courier.getTimeLineContent(),
      courier.getDeliveries().map(DeliveryApiAdapter.toApi),
      courier.getCreatedAt(),
      courier.getUpdatedAt()
    );
  }
}
