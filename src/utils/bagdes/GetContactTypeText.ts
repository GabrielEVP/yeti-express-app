export const getContactTypeText = (type: "NT" | "JU" | "GB" | "OT"): string => {
   switch (type) {
      case "NT":
         return "Persona Natural";
      case "JU":
         return "Persona Jurídica";
      case "GB":
         return "Entidad Gubernamental";
      case "OT":
         return "Otros";
   }
};

export const getContactTypeClass = (type: "NT" | "JU" | "GB" | "OT"): string => {
   switch (type) {
      case "NT":
         return "border-blue-500";
      case "JU":
         return "border-green-500";
      case "GB":
         return "border-yellow-500";
      case "OT":
         return "border-gray-500";
      default:
         return "border-black";
   }
};
