import CreditCardIcon from "@mui/icons-material/CreditCard";
import MoneyIcon from "@mui/icons-material/Money";
import React, {ReactNode} from "react";

const paymentMethods: PaymentMethods = {
    card: {
        icon: <CreditCardIcon/>,
        fullSentence: "Вы оплатили заказ картой",
        buttonName: "Предоплата картой",
    },
    cash: {
        icon: <MoneyIcon/>,
        fullSentence: "Вы оплатите заказ наличными",
        buttonName: "Наличными при получении",
    }
};

export interface PaymentMethods {
    [key: string]: PaymentMethod
}

export interface PaymentMethod {
    icon: ReactNode,
    fullSentence: ReactNode,
    buttonName: ReactNode,
}

export default paymentMethods;
