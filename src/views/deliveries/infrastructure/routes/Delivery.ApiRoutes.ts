import { DeliveryStatus } from '@views/deliveries/domain';

export const deliveryApiRoutes = {
  list: '/deliveries',
  details: (id: number | string) => `/deliveries/${id}`,
  search: (search: string) => `/deliveries/search/${search}`,
  updateStatus: (deliveryStatus: DeliveryStatus) => `/deliveries/${deliveryStatus}/status/`,
  ticket: (id: number | string) => `/deliveries/${id}`,
};
