export const employerApiRoutes = {
   list: "/employees",
   details: (employerId: string) => `/employees/${employerId}`,
   search: (search: string) => `/employees/search/${search}`,
};

export const employerAppRoutes = {
   list: "/employees",
   new: "/employees/new",
   edit: (id: string | number) => `/employees/edit/${id}`,
   details: (id: string | number) => `/employees/${id}`,
};
