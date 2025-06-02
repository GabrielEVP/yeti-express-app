export const AppRoutesCompanyBill = {
  list: '/company-bills',
  new: '/company-bills/new',
  edit: (id: string | number) => `/company-bills/edit/${id}`,
  details: (id: string | number) => `/company-bills/${id}`,
};
