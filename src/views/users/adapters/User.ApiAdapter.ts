import { User } from "@/views/users/";

export function adaptUser(apiData: any): User {
   return {
      id: apiData.id,
      name: apiData.name,
      email: apiData.email,
      profile_image: apiData.profile_image,
   };
}

export function adaptUserForApi(user: User): any {
   return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_image: user.profile_image,
   };
}

export function adaptPassword(apiData: any): { password: string; confirmPassword: string } {
   return {
      password: apiData.password,
      confirmPassword: apiData.confirm_Password,
   };
}

export function adaptPasswordForApi(passwordData: { password: string; confirmPassword: string }): any {
   return {
      password: passwordData.password,
      confirm_Password: passwordData.confirmPassword,
   };
}
