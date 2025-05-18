export const userAppRoutes = {
   details: "/users",
   edit: "/users/edit",
   changePassword: "/users/changePassword",
};

export const userApiRoutes = {
   get: "/users",
   details: (id: number | string) => `/users/${id}`,
};
