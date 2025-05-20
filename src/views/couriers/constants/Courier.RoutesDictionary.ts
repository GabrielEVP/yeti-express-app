export const dealerApiRoutes = {
   list: "/couriers",
   details: (dealerId: string) => `/couriers/${dealerId}`,
   search: (search: string) => `/couriers/search/${search}`,
};

export const dealerAppRoutes = {
   list: "/couriers",
   new: "/couriers/new",
   edit: (id: string | number) => `/couriers/edit/${id}`,
   details: (id: string | number) => `/couriers/${id}`,
};
