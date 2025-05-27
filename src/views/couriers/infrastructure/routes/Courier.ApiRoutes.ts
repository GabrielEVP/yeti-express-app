export const courierApiRoutes = {
  list: '/couriers',
  details: (courierId: string) => `/couriers/${courierId}`,
  search: (search: string) => `/couriers/search/${search}`,
};
