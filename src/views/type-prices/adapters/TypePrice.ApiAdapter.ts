import { TypePrice } from "@/views/type-prices";

export function adaptTypePrice(apiData: any): TypePrice {
   return {
      id: apiData.id,
      name: apiData.name,
      type: apiData.type,
      margin: Number(apiData.margin),
      userId: apiData.user_id,
   };
}

export function adaptTypePriceForApi(typePrice: TypePrice): any {
   return {
      id: typePrice.id,
      name: typePrice.name,
      type: typePrice.type,
      margin: typePrice.margin,
      user_id: typePrice.userId,
   };
}
