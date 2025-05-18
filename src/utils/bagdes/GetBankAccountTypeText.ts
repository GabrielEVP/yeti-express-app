export const getBankAccountTypeText = (type: "AH" | "CO" | "OT"): string => {
    switch (type) {
        case "AH":
            return "Ahorro";
        case "CO":
            return "Corriente";
        case "OT":
            return "Otro";
    }
};