import { Courier } from "@/views/couriers/";

export function adaptDealer(apiData: any): Courier {
    return {
        id: apiData.id,
        firstName: apiData.first_name,
        lastName: apiData.last_name,
        phone: apiData.phone,
        commission: apiData.commission,
        active: apiData.active,
        userId: apiData.user_id,
        createdAt: apiData.created_at,
        updatedAt: apiData.updated_at,
    };
}

export function adaptDealerForApi(courier: Courier): any {
   return {
      id: courier.id,
      first_name: courier.firstName,
      last_name: courier.lastName,
      phone: courier.phone,
      commission: courier.commission,
      active: courier.active,
      user_id: courier.userId,
      created_at: courier.createdAt,
      updated_at: courier.updatedAt,
   };
}
}
