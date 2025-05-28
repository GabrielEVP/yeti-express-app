export const clientApiRoutes = {
  list: '/clients',
  details: (clientId: string) => `/clients/${clientId}`,
  search: (search: string) => `/clients/search/${search}`,
};
