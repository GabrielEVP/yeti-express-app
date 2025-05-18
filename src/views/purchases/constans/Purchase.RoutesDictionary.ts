export const purchaseAppRoutes = {
   list: "/purchases",
   new: "/purchases/new",
   edit: (id: string | number) => `/purchases/edit/${id}`,
   details: (id: string | number) => `/purchases/${id}`,
};

export const purchaseApiRoutes = {
   list: "/purchases",
   details: (id: number | string) => `/purchases/${id}`,
   search: (search: string) => `/purchases/search/${search}`,
};
