export const AppRoutesDelivery = {
  list: '/deliveries',
  new: '/deliveries/new',
  edit: (id: string | number) => `/deliveries/edit/${id}`,
  details: (id: string | number) => `/deliveries/${id}`,
};
