import {JSONRPCClient, JSONRPCRequest} from "./client";

class Api {
    jwtToken?: string;
    private client: JSONRPCClient;

    constructor() {
        this.client = new JSONRPCClient(process.env.GATSBY_FUNCTION_URL);
    }

    async sendCodeAndOrder(cartProducts: Array<any>, address: string, paymentMethod: string, phone: string, code: string): Promise<{ redirect?: string }> {
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

    async order(cartProducts: Array<any>, phone: string, address: string, paymentMethod: string): Promise<{ redirect?: string }> {
        const result = await this.client.call([
            this._login(phone),
            Api._order(cartProducts, address, paymentMethod)
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

    private _login(phone: string): JSONRPCRequest {
        if (this.jwtToken === null) {
            return {
                jsonrpc: '2.0',
                id: "0",
                method: 'login',
                params: {
                    phone: phone,
                    verify: false
                },
            }
        } else {
            return {
                jsonrpc: '2.0',
                id: '0',
                method: 'verify',
                params: {
                    token: this.jwtToken
                }
            }
        }
    }

    private static _order(cartProducts: Array<any>, paymentMethod: string, address: string): JSONRPCRequest {
        return {
            jsonrpc: '2.0',
            id: "1",
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

    private static _sendCode(phone: string, code: number): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: 0,
            method: "check_code",
            params: {
                phone: phone,
                code: code
            }
        }
    }

    private static _resendCode(phone: string): JSONRPCRequest {
        return {
            jsonrpc: "2.0",
            id: 0,
            method: "send_code",
            params: {
                phone: phone
            }
        }
    }
}

export class JSONRPCError extends Error {
    public code: number;

    constructor(code, message) {
        super(message);

        this.code = code;
    }
}

export default Api;