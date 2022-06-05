import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import React from "react";

const paymentMethods = {
    card: {
        icon: <CreditCardIcon />,
        instrumentalCaseName: "Картой",
        prepayment: true
    },
    cash: {
        icon: <MoneyIcon />,
        instrumentalCaseName: "наличными",
        prepayment: false
    }
}

export default paymentMethods;
