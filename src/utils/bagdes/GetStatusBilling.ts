export const getStatusBillingText = (type: "pending" | "paid" | "refused"): string => {
   switch (type) {
      case "pending":
         return "Pendiente";
      case "paid":
         return "Pagada";
      case "refused":
         return "Rechazada";
   }
};

export const getStatusBillingClass = (type: "pending" | "paid" | "refused"): string => {
   switch (type) {
      case "pending":
         return "border-blue-500";
      case "paid":
         return "border-green-500";
      case "refused":
         return "border-yellow-500";
      default:
         return "border-black";
   }
};
