export const serviceAppRoutes = {
  list: '/services',
  new: '/services/new',
  edit: (id: string | number) => `/services/edit/${id}`,
  details: (id: string | number) => `/services/${id}`,
};

export const serviceApiRoutes = {
  list: '/services',
  details: (id: number | string) => `/services/${id}`,
  search: (search: string) => `/services/search/${search}`,
};
