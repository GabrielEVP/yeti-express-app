export const typePriceAppRoutes = {
   list: "/type-prices",
   new: "/type-prices/new",
   edit: (id: string | number) => `/type-prices/edit/${id}`,
   details: (id: string | number) => `/type-prices/${id}`,
};

export const typePriceApiRoutes = {
   list: "/type-prices",
   details: (id: number | string) => `/type-prices/${id}`,
   search: (search: string) => `/type-prices/search/${search}`,
};
