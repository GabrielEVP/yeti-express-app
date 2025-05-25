import { Courier, CourierEvent } from '@/views/couriers/';
import { adaptEvents, adaptEventsForApi } from '@/adapters/';

export function adaptCourier(apiData: any): Courier {
  return {
    id: apiData.id,
    firstName: apiData.first_name,
    lastName: apiData.last_name,
    phone: apiData.phone,
    active: apiData.active,
    userId: apiData.user_id,
    events: Array.isArray(apiData.events) ? apiData.lines.map(adaptCourierEvent) : [],
    createdAt: apiData.created_at,
    updatedAt: apiData.updated_at,
  };
}

export function adaptCourierForApi(courier: Courier): any {
  return {
    id: courier.id,
    first_name: courier.firstName,
    last_name: courier.lastName,
    phone: courier.phone,
    active: courier.active,
    user_id: courier.userId,
    events: courier.events.map(adaptCourierEventForApi),
    created_at: courier.createdAt,
    updated_at: courier.updatedAt,
  };
}

export function adaptCourierEvent(apiEvent: any): CourierEvent {
  return {
    ...adaptEvents(apiEvent),
    courierId: apiEvent.courier_id,
  };
}

export function adaptCourierEventForApi(event: CourierEvent): any {
  return {
    ...adaptEventsForApi(event),
    courier_id: event.courierId,
  };
}
