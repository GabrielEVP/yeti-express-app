import { Address } from "@/models/";

export function adaptAddress(apiAddress: any): Address {
   return {
      id: apiAddress.id,
      country: apiAddress.country,
      address: apiAddress.address,
      state: apiAddress.state,
      city: apiAddress.city,
      municipality: apiAddress.municipality,
      postalCode: apiAddress.postal_code,
      isBilling: adaptIntegerToBoolean(apiAddress.is_billing),
   };
}

export function adaptAddressForApi(address: Address): any {
   return {
      id: address.id,
      country: address.country,
      address: address.address,
      state: address.state,
      city: address.city,
      municipality: address.municipality,
      postal_code: address.postalCode,
      is_billing: adaptBooleanToInteger(address.isBilling),
   };
}

function adaptIntegerToBoolean(number: number): boolean {
   if (number === 0) {
      return false;
   } else {
      return true;
   }
}

function adaptBooleanToInteger(boolean: boolean): number {
   if (!boolean) {
      return 0;
   } else {
      return 1;
   }
}
