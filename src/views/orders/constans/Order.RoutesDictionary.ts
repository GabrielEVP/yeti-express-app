export const orderAppRoutes = {
   list: "/orders",
   new: "/orders/new",
   edit: (id: string | number) => `/orders/edit/${id}`,
   details: (id: string | number) => `/orders/${id}`,
};

export const orderApiRoutes = {
   list: "/orders",
   details: (id: number | string) => `/orders/${id}`,
   search: (search: string) => `/orders/search/${search}`,
};
