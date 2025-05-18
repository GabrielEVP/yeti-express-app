import { apiClient } from "@/services/";

export async function login(email: string, password: string) {
   try {
      const response = await apiClient.post("/login", { email, password });
      return response.data;
   } catch (error) {
      throw new Error(String(error));
   }
}

export async function register(name: string, email: string, password: string) {
   try {
      const response = await apiClient.post(
         "/register",
         { name, email, password },
         {
            headers: { "Content-Type": "application/json" },
         }
      );
      return response.data;
   } catch (error) {
      throw new Error(String(error));
   }
}

export async function logout() {
   try {
      const response = await apiClient.post("/logout");
      return response.data;
   } catch (error) {
      throw new Error(String(error));
   }
}

export async function getUser() {
   try {
      const response = await apiClient.get("/user");
      return response.data;
   } catch (error) {
      throw new Error(String(error));
   }
}

export async function updateUser(formData: FormData) {
   formData.append("_method", "PUT");

   const response = await apiClient.post("/user/update", formData, {
      headers: {
         "Content-Type": "multipart/form-data",
      },
   });

   return response.data;
}

export async function updatePassword(data: any) {
   try {
      const response = await apiClient.put("/user/password", data);
      return response.data;
   } catch (error) {
      throw new Error(String(error));
   }
}

export async function getProfileImageUrl(url: string) {
   try {
      const response = await apiClient.get(url, { responseType: "blob" });
      return URL.createObjectURL(response.data);
   } catch (error) {
      throw new Error(String(error));
   }
}
