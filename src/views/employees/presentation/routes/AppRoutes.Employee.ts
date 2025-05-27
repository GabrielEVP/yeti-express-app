export const AppRoutesEmployee = {
  list: '/employees',
  new: '/employees/new',
  edit: (id: string | number) => `/employees/edit/${id}`,
  details: (id: string | number) => `/employees/${id}`,
};
