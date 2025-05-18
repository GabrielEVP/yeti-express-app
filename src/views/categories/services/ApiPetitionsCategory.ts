import { useGetAxios, useFilterGetAxios, usePostAxios, usePutAxios, useDeleteAxios } from "@/services/";
import { Category, adaptCategory, adaptCategoryForApi, categoryApiRoutes } from "@views/categories/";

export const getCategories = async () => {
   try {
      const data = await useGetAxios(categoryApiRoutes.list);
      return Array.isArray(data) ? data.map(adaptCategory) : [];
   } catch (error) {
      return error;
   }
};

export const postCategories = async (data: Category) => {
   try {
      data = { ...data };
      data = adaptCategoryForApi(data);
      return await usePostAxios(categoryApiRoutes.list, data);
   } catch (error) {
      return error;
   }
};

export const putCategories = async (data: Category, categoryId: string) => {
   try {
      data = { ...data };
      data = adaptCategoryForApi(data);
      return await usePutAxios(categoryApiRoutes.details(categoryId), data);
   } catch (error) {
      return error;
   }
};

export const getCategory = async (categoryId: string) => {
   try {
      const data = await useGetAxios(categoryApiRoutes.details(categoryId));
      return adaptCategory(data);
   } catch (error) {
      return error;
   }
};

export const deleteCategory = async (categoryId: string) => {
   try {
      return await useDeleteAxios(categoryApiRoutes.details(categoryId));
   } catch (error) {
      return error;
   }
};

export const getFilterCategories = async (data: any) => {
   try {
      const result = await useFilterGetAxios(categoryApiRoutes.list, data);
      return Array.isArray(result) ? result.map(adaptCategory) : [];
   } catch (error) {
      return error;
   }
};
