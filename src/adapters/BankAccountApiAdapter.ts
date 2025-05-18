import { BankAccount } from "@/models/";

export function adaptBankAccount(apiAccountBank: any): BankAccount {
   return {
      id: apiAccountBank.id,
      name: apiAccountBank.name,
      accountNumber: apiAccountBank.account_number,
      type: apiAccountBank.type as "AH" | "CO" | "OT",
   };
}

export function adaptBankAccountForApi(account: BankAccount): any {
   return {
      id: account.id,
      name: account.name,
      account_number: account.accountNumber,
      type: account.type,
   };
}
