export const deliveryAppRoutes = {
   list: "/deliveries",
   new: "/deliveries/new",
   edit: (id: string | number) => `/deliveries/edit/${id}`,
   details: (id: string | number) => `/deliveries/${id}`,
};

export const deliveryApiRoutes = {
   list: "/deliveries",
   details: (id: number | string) => `/deliveries/${id}`,
   search: (search: string) => `/deliveries/search/${search}`,
};
