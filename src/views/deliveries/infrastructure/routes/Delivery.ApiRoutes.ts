export const deliveryApiRoutes = {
  list: '/deliveries',
  details: (id: number | string) => `/deliveries/${id}`,
  search: (search: string) => `/deliveries/search/${search}`,
  ticket: (id: number | string) => `/deliveries/${id}`,
};
