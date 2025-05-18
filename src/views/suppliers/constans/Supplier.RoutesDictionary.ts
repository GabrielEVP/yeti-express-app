export const supplierAppRoutes = {
   list: "/suppliers",
   new: "/suppliers/new",
   edit: (id: string | number) => `/suppliers/edit/${id}`,
   details: (id: string | number) => `/suppliers/${id}`,
};

export const supplierApiRoutes = {
   list: "/suppliers",
   details: (id: number | string) => `/suppliers/${id}`,
   search: (search: string) => `/suppliers/search/${search}`,
};
