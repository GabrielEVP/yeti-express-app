export const employerApiRoutes = {
  list: '/employees',
  details: (employerId: string) => `/employees/${employerId}`,
  search: (search: string) => `/employees/search/${search}`,
};
