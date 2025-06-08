export const companyBillApiRoutes = {
  list: "/company-bills",
  details: (id: string) => `/company-bills/${id}`,
  search: (query: string) => `/company-bills/search/${query}`,
};
