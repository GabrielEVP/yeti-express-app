export const courierApiRoutes = {
   list: "/couriers",
   details: (courierId: string) => `/couriers/${courierId}`,
   search: (search: string) => `/couriers/search/${search}`,
};

export const courierAppRoutes = {
   list: "/couriers",
   new: "/couriers/new",
   edit: (id: string | number) => `/couriers/edit/${id}`,
   details: (id: string | number) => `/couriers/${id}`,
};
