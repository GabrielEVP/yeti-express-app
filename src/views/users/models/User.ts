export interface User {
   id: string;
   name: string;
   email: string;
   profile_image: { name: string } | null;
}

export interface Password {
   password: string;
   confirmPassword: string;
}
