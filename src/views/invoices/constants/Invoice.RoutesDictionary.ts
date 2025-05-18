export const invoiceAppRoutes = {
   list: "/invoices",
   new: "/invoices/new",
   edit: (id: string | number) => `/invoices/edit/${id}`,
   details: (id: string | number) => `/invoices/${id}`,
};

export const invoiceApiRoutes = {
   list: "/invoices",
   details: (id: number | string) => `/invoices/${id}`,
   search: (search: string) => `/invoices/search/${search}`,
};
