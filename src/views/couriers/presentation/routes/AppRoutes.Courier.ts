export const AppRoutesCourier = {
  list: '/couriers',
  new: '/couriers/new',
  edit: (id: string | number) => `/couriers/edit/${id}`,
  details: (id: string | number) => `/couriers/${id}`,
};
