import { Category } from "@/views/categories/";

export function adaptCategory(apiData: any): Category {
  return {
    id: apiData.id,
    name: apiData.name,
    userId: apiData.user_id,
  };
}

export function adaptCategoryForApi(category: Category): any {
  return {
    id: category.id,
    name: category.name,
    user_id: category.userId,
  };
}
