import { Courier } from '@/views/couriers/';
import { adaptTimeLineContent } from '@/time-line-content/adapter';

export function adaptCourier(apiData: any = {}): Courier {
  return {
    id: apiData.id ?? '',
    firstName: apiData.first_name ?? '',
    lastName: apiData.last_name ?? '',
    phone: apiData.phone ?? '',
    events: Array.isArray(apiData.events) ? apiData.events.map(adaptTimeLineContent) : [],
    createdAt: apiData.created_at ?? '',
    updatedAt: apiData.updated_at ?? '',
  };
}

export function adaptCourierForApi(courier: Courier): any {
  return {
    id: courier.id ?? null,
    first_name: courier.firstName ?? null,
    last_name: courier.lastName ?? null,
    phone: courier.phone ?? null,
  };
}
