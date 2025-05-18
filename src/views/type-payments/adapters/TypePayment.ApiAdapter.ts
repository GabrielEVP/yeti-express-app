import { TypePayment } from "@/views/type-payments/";

export function adaptTypePayment(apiData: any): TypePayment {
   return {
      id: apiData.id,
      name: apiData.name,
      userId: apiData.user_id,
   };
}

export function adaptTypePaymentForApi(typePayment: TypePayment): any {
   return {
      id: typePayment.id,
      name: typePayment.name,
      user_id: typePayment.userId,
   };
}
