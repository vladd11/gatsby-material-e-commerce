import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import React, {ReactNode} from "react";

const paymentMethods : PaymentMethods = {
    card: {
        icon: <CreditCardIcon/>,
        instrumentalCaseName: "Картой",
        buttonName: "Предоплата картой",
        prepayment: true
    },
    cash: {
        icon: <MoneyIcon/>,
        instrumentalCaseName: "наличными",
        buttonName: "Наличными при получении",
        prepayment: false
    }
};

export interface PaymentMethods {
    [key: string]: PaymentMethod
}

export interface PaymentMethod {
    icon: ReactNode,
    instrumentalCaseName: ReactNode,
    buttonName: ReactNode,
    prepayment: boolean
}

export default paymentMethods;
