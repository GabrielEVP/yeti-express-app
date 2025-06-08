import { Courier } from '@/views/couriers/';
import { adaptDeliveryToCourier } from '@views/deliveries';

export class CourierApiAdapter extends Courier {
  static fromApi(apiData: any): Courier {
    return new Courier(
      apiData.id,
      apiData.firstName,
      apiData.lastName,
      apiData.phone,
      apiData.active,
      apiData.timeLineContent,
      apiData.deliveries ? apiData.deliveries.map(adaptDeliveryToCourier) : [],
      new Date(apiData.createdAt),
      new Date(apiData.updatedAt)
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
      courier.getDeliveries().map(adaptDeliveryToCourier),
      courier.getCreatedAt(),
      courier.getUpdatedAt()
    );
  }
}
