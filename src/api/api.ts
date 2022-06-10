import {JSONRPCClient, JSONRPCRequest} from "./client";
import OrderResponse from "../interfaces/order";
import User from "../interfaces/User";
import {optionalLocalStorage} from "../states/localStorageState";

const toUnixTime = (date: Date) => Math.floor(date.getTime() / 1000);

export const setPhone = (phone: string) => localStorage.setItem("user.phone", phone)
export const getPhone = (): string => optionalLocalStorage(() => localStorage.getItem("user.phone"))

export function logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user.phone")
}

export function getCachedUser(): User {
    return {
        phone: getPhone()
    }
}

export default class Api {
    jwtToken?: string | null;
    private client: JSONRPCClient;

    constructor() {
        optionalLocalStorage(() => this.jwtToken = localStorage.getItem("jwt_token"))

        this.client = new JSONRPCClient(process.env.GATSBY_FUNCTION_URL!);
    }

    handleVerifyResult(errors: Array<JSONRPCError>, response: any) {
        if (errors?.[0]?.code !== 1005) {
            setPhone(response.phone)
        }
    }

    setJWTToken(token: string) {
        localStorage.setItem("jwt_token", token);
        this.jwtToken = token;
    }

    async getOrder(orderID: string): Promise<OrderResponse> {
        const result = await this.client.call([
            this._verify(0),
            this._getOrder(orderID, 1)
        ])

        const responses = result.responses
        const errors = result.errors

        this.handleVerifyResult(errors, responses[0])

        if (errors !== null && errors.length === 0) {
            return responses[1];
        } else { // This throws only one exception because method add_order depends on registration
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    _getOrder(orderID: string, id?: any): JSONRPCRequest {
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
                           phone: string,
                           address: string,
                           paymentMethod: string,
                           time: Date,
                           code: string): Promise<OrderResponse> {
        const result = await this.client.call([
            Api._checkCode(phone, parseInt(code), 0),
            Api._order(cartProducts, paymentMethod, address, phone, toUnixTime(time), 1)
        ])

        const responses = result.responses
        const errors = result.errors

        if (errors.length === 0) {
            this.setJWTToken(responses[0].token)
            setPhone(phone)

            return responses[1]
        } else {
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    async resendCode(phone: string): Promise<void> {
        await this.client.call([
            Api._sendCode(phone)
        ])
    }

    async order(cartProducts: Array<any>,
                phone: string,
                address: string,
                paymentMethod: string,
                time: Date): Promise<OrderResponse> {
        const result = await this.client.call([
            this._login(phone, 0),
            Api._order(cartProducts, paymentMethod, address, phone, toUnixTime(time), 1)
        ])

        const responses = result.responses
        const errors = result.errors

        if (errors?.[0]?.code !== 1005 && !(this.jwtToken)) {
            setPhone(phone)
            this.setJWTToken(responses[0].token)
        } else this.handleVerifyResult(errors, responses[0])

        if (errors.length === 0) {
            return responses[1]
        } else { // This throws only one exception because method add_order depends on registration
            throw new JSONRPCError(errors[0].code, errors[0].message)
        }
    }

    private _verify(id?: any): JSONRPCRequest {
        return {
            jsonrpc: '2.0',
            id: id,
            method: 'verify',
            params: {
                token: this.jwtToken
            }
        }
    }

    private _login(phone: string, id?: any): JSONRPCRequest {
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
                          phone: string,
                          time: number,
                          id?: any): JSONRPCRequest {
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
                address: address,
                phone: phone,
                time: time
            }
        }
    }

    private static _checkCode(phone: string, code: number, id?: any): JSONRPCRequest {
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

    private static _sendCode(phone: string, id?: any): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: id,
            method: "send_code",
            params: {
                phone: phone
            }
        }
    }

    async sendCode(phone: string) {
        const result = await fetch(`${process.env.GATSBY_FUNCTION_URL}/send-code`, {
            method: "POST",
            body: JSON.stringify({phone: `+7${phone}`})
        })
        if (result.status === 401) {
            throw new UnauthorizedError();
        }
    }
}

export class UnauthorizedError extends Error {
    public code: number;

    constructor() {
        super("401 Unauthorized");

        this.code = 401;
    }
}

export class JSONRPCError extends Error {
    public code: number;

    constructor(code: number, message: string) {
        super(message);

        this.code = code;
    }
}
