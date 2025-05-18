export const productAppRoutes = {
   list: "/products",
   new: "/products/new",
   edit: (id: string | number) => `/products/edit/${id}`,
   details: (id: string | number) => `/products/${id}`,
};

export const productApiRoutes = {
   list: "/products",
   details: (id: number | string) => `/products/${id}`,
   search: (search: string) => `/products/search/${search}`,
};
