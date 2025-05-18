export const categoryRoutes = {
   list: "/categories",
   new: "/categories/new",
   edit: (id: string | number) => `/categories/edit/${id}`,
   details: (id: string | number) => `/categories/${id}`,
};

export const categoryApiRoutes = {
   list: "/categories",
   details: (id: number | string) => `/categories/${id}`,
   search: (search: string) => `/categories/search/${search}`,
};
