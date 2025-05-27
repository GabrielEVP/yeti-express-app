import { Courier } from '@/views/couriers/';

export function adaptCourier(apiData: any): Courier {
  return new Courier(
    apiData.id,
    apiData.first_name,
    apiData.last_name,
    apiData.phone,
    apiData.active,
    apiData.created_at,
    apiData.updated_at
  );
}

export function adaptCourierForApi(courier: Courier): any {
  return {
    id: courier.getId(),
    first_name: courier.getFirstName(),
    last_name: courier.getLastName(),
    phone: courier.getPhone(),
    active: courier.isActive(),
    created_at: courier.getCreatedAt(),
    updated_at: courier.getUpdatedAt(),
  };
}
