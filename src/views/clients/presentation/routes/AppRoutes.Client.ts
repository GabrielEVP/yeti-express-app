export const AppRoutesClient = {
  list: '/clients',
  new: '/clients/new',
  edit: (id: string | number) => `/clients/edit/${id}`,
  details: (id: string | number) => `/clients/${id}`,
};
