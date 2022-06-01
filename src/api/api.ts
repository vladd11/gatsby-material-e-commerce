import {JSONRPCClient, JSONRPCRequest} from "./client";
import Order from "../interfaces/order";

export default class Api {
    jwtToken?: string;
    private client: JSONRPCClient;

    constructor() {
        if (typeof localStorage !== 'undefined') {
            this.jwtToken = localStorage.getItem("jwt_token")
        }

        this.client = new JSONRPCClient(process.env.GATSBY_FUNCTION_URL);
    }

    async getOrder(orderID: string): Promise<Order> {
        const result = await this.client.call([
            this._verify(0),
            this._getOrder(orderID, 1)
        ])

        const responses = result.responses
        const errors = result.errors

        if (errors !== null && errors.length === 0) {
            console.log(responses);
            return responses[1];
        } else { // This throws only one exception because method add_order depends on registration
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    _getOrder(orderID: string, id?): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: id,
            method: "get_order",
            params: {
                orderID: orderID
            }
        }
    }

    async sendCodeAndOrder(cartProducts: Array<any>,
                           address: string,
                           paymentMethod: string,
                           phone: string,
                           code: string): Promise<OrderResponse> {
        const result = await this.client.call([
            Api._sendCode(phone, parseInt(code)),
            Api._order(cartProducts, paymentMethod, address)
        ])

        const responses = result.responses
        const errors = result.errors

        if (errors !== null && errors.length === 0) {
            localStorage.setItem("jwt_token", responses[0].token)
            this.jwtToken = responses[0].token

            return responses[1]
        } else {
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    async resendCode(phone: string): Promise<void> {
        await this.client.call([
            Api._resendCode(phone)
        ])
    }

    async order(cartProducts: Array<any>,
                phone: string,
                address: string,
                paymentMethod: string): Promise<OrderResponse> {
        const result = await this.client.call([
            this._login(phone, 0),
            Api._order(cartProducts, paymentMethod, address)
        ])

        const responses = result.responses
        const errors = result.errors

        if (errors !== null && errors.length === 0) {
            if (this.jwtToken === null) {
                localStorage.setItem("jwt_token", responses[0].token)
                this.jwtToken = responses[0].token
            }

            return responses[1]
        } else { // This throws only one exception because method add_order depends on registration
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    private _verify(id?): JSONRPCRequest {
        return {
            jsonrpc: '2.0',
            id: id,
            method: 'verify',
            params: {
                token: this.jwtToken
            }
        }
    }

    private _login(phone: string, id?): JSONRPCRequest {
        if (this.jwtToken === null) {
            return {
                jsonrpc: '2.0',
                id: id,
                method: 'login',
                params: {
                    phone: phone,
                    verify: false
                },
            }
        } else {
            return this._verify();
        }
    }

    private static _order(cartProducts: Array<any>,
                          paymentMethod: string,
                          address: string,
                          id?): JSONRPCRequest {
        return {
            jsonrpc: '2.0',
            id: id,
            method: 'add_order',
            params: {
                products: cartProducts.map(
                    (cartProduct) => {
                        return {
                            id: cartProduct.ProductID,
                            count: 1
                        }
                    }
                ),
                paymentMethod: paymentMethod,
                address: address
            }
        }
    }

    private static _sendCode(phone: string, code: number, id?): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: id,
            method: "check_code",
            params: {
                phone: phone,
                code: code
            }
        }
    }

    private static _resendCode(phone: string, id?): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: id,
            method: "send_code",
            params: {
                phone: phone
            }
        }
    }
}

export type OrderResponse = {
    redirect?: string,
    id?: string,

    phone: string,
    price: number
};

export class JSONRPCError extends Error {
    public code: number;

    constructor(code, message) {
        super(message);

        this.code = code;
    }
}
