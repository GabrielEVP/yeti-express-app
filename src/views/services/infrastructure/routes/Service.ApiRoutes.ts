export const serviceApiRoutes = {
  list: '/services',
  details: (serviceId: string) => `/services/${serviceId}`,
  search: (search: string) => `/services/search/${search}`,
};
