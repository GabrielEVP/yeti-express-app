export const clientApiRoutes = {
  list: '/clients',
  filter: 'clients/filter',
  details: (clientId: string) => `/clients/${clientId}`,
  search: (search: string) => `/clients/search/${search}`,
  debtReport: (clientId: string) => `/clients/${clientId}/debt-report`,
};
