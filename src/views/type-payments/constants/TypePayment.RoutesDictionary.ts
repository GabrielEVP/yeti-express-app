export const typePaymentAppRoutes = {
   list: "/type-payments",
   new: "/type-payments/new",
   edit: (id: string | number) => `/type-payments/edit/${id}`,
   details: (id: string | number) => `/type-payments/${id}`,
};

export const typePaymentApiRoutes = {
   list: "/type-payments",
   details: (id: string | number) => `/type-payments/${id}`,
   search: (search: string) => `/type-payments/search/${search}`,
};
