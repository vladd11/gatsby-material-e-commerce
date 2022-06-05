import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import React from "react";

const paymentMethods = {
    card: {
        icon: <CreditCardIcon />,
        instrumentalCaseName: "Картой",
        buttonName: "Предоплата картой",
        prepayment: true
    },
    cash: {
        icon: <MoneyIcon />,
        instrumentalCaseName: "наличными",
        buttonName: "Наличными при получении",
        prepayment: false
    }
};

export default paymentMethods;
